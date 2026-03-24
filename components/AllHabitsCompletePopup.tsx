import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AUTO_CLOSE_DELAY_MS,
  BUTTERFLY_ROTATE_CONFIG,
  BUTTERFLY_SCALE_CONFIG,
  BUTTERFLY_TRANSLATE_X_CONFIG,
  BUTTERFLY_TRANSLATE_Y_CONFIG,
  BUTTERFLY_WING_SCALE_CONFIG,
  createCelebrationSequence,
  createSlitherLoop,
  WORM_COLORS,
  WORM_ROTATE_CONFIG,
  WORM_SEGMENTS,
  WORM_TRANSLATE_X_CONFIG,
  WORM_TRANSLATE_Y_CONFIG,
} from "@/animation/all-habits-complete-popup";
import { AppTheme } from "@/constants/theme";
import { allHabitsCompletePopupStyles as styles } from "@/styles/components/all-habits-complete-popup";

type AllHabitsCompletePopupProps = {
  onClose: (showHomeMessage?: boolean) => void;
};

const MIN_BOTTOM_INSET = 18;
const SHELL_PADDING = 22;
const SKIP_BUTTON_OFFSET = 6;

function clearScheduledClose(timeoutRef: {
  current: ReturnType<typeof setTimeout> | null;
}) {
  if (!timeoutRef.current) return;

  clearTimeout(timeoutRef.current);
  timeoutRef.current = null;
}

function closeCelebration(
  timeoutRef: { current: ReturnType<typeof setTimeout> | null },
  onClose: AllHabitsCompletePopupProps["onClose"],
  showHomeMessage = false
) {
  clearScheduledClose(timeoutRef);
  onClose(showHomeMessage);
}

export default function AllHabitsCompletePopup({
  onClose,
}: AllHabitsCompletePopupProps) {
  const insets = useSafeAreaInsets();
  const autoCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wormProgress = useRef(new Animated.Value(0)).current;
  const wormOpacity = useRef(new Animated.Value(1)).current;
  const slitherCycle = useRef(new Animated.Value(0)).current;
  const butterflyProgress = useRef(new Animated.Value(0)).current;
  const butterflyOpacity = useRef(new Animated.Value(0)).current;
  const shellPaddingBottom = Math.max(insets.bottom, MIN_BOTTOM_INSET) + SHELL_PADDING;
  const skipButtonBottom = Math.max(insets.bottom, MIN_BOTTOM_INSET) + SKIP_BUTTON_OFFSET;

  useEffect(() => {
    clearScheduledClose(autoCloseTimeoutRef);
    wormProgress.setValue(0);
    wormOpacity.setValue(1);
    slitherCycle.setValue(0);
    butterflyProgress.setValue(0);
    butterflyOpacity.setValue(0);

    const slitherLoop = createSlitherLoop(slitherCycle);
    const animation = createCelebrationSequence({
      butterflyOpacity,
      butterflyProgress,
      wormOpacity,
      wormProgress,
    });

    slitherLoop.start();
    animation.start(({ finished }) => {
      if (!finished) return;

      autoCloseTimeoutRef.current = setTimeout(() => {
        closeCelebration(autoCloseTimeoutRef, onClose, true);
      }, AUTO_CLOSE_DELAY_MS);
    });

    return () => {
      slitherLoop.stop();
      animation.stop();
      clearScheduledClose(autoCloseTimeoutRef);
    };
  }, [
    butterflyOpacity,
    butterflyProgress,
    onClose,
    slitherCycle,
    wormOpacity,
    wormProgress,
  ]);

  const wormTranslateX = wormProgress.interpolate(WORM_TRANSLATE_X_CONFIG);
  const wormTranslateY = wormProgress.interpolate(WORM_TRANSLATE_Y_CONFIG);
  const wormRotate = wormProgress.interpolate(WORM_ROTATE_CONFIG);
  const butterflyTranslateX = butterflyProgress.interpolate(BUTTERFLY_TRANSLATE_X_CONFIG);
  const butterflyTranslateY = butterflyProgress.interpolate(BUTTERFLY_TRANSLATE_Y_CONFIG);
  const butterflyRotate = butterflyProgress.interpolate(BUTTERFLY_ROTATE_CONFIG);
  const butterflyScale = butterflyProgress.interpolate(BUTTERFLY_SCALE_CONFIG);
  const butterflyWingScale = butterflyProgress.interpolate(BUTTERFLY_WING_SCALE_CONFIG);

  return (
    <Modal
      visible
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={() => closeCelebration(autoCloseTimeoutRef, onClose)}
    >
      <View style={styles.popupLayer}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowMiddle} />
        <View style={styles.backgroundGlowBottom} />
        <View style={styles.backgroundMistLeft} />
        <View style={styles.backgroundMistRight} />

        <View
          style={[
            styles.popupShell,
            {
              paddingTop: insets.top + SHELL_PADDING,
              paddingBottom: shellPaddingBottom,
            },
          ]}
        >
          <View style={styles.sceneCard}>
            <View style={styles.scene}>
              <Image
                source={require("../assets/animation/tree.png")}
                style={styles.treeImage}
                resizeMode="contain"
              />

              <Animated.View
                style={[
                  styles.animatedButterfly,
                  {
                    opacity: butterflyOpacity,
                    transform: [
                      { translateX: butterflyTranslateX },
                      { translateY: butterflyTranslateY },
                      { rotate: butterflyRotate },
                      { scale: butterflyScale },
                    ],
                  },
                ]}
              >
                <View style={styles.butterfly}>
                  <Animated.View
                    style={[
                      styles.butterflyWing,
                      styles.butterflyWingLeft,
                      styles.butterflyWingLeftPalette,
                      {
                        transform: [
                          { rotate: "-26deg" },
                          { scaleX: butterflyWingScale },
                        ],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.butterflyWing,
                      styles.butterflyWingRight,
                      styles.butterflyWingRightPalette,
                      {
                        transform: [
                          { rotate: "26deg" },
                          { scaleX: butterflyWingScale },
                        ],
                      },
                    ]}
                  />
                  <View style={styles.butterflyBody} />
                  <View style={styles.butterflyHead} />
                  <View style={styles.butterflyAntennaLeft} />
                  <View style={styles.butterflyAntennaRight} />
                </View>
              </Animated.View>
            </View>
          </View>

          <Animated.View
            style={[
              styles.animatedWorm,
              {
                opacity: wormOpacity,
                transform: [
                  { translateX: wormTranslateX },
                  { translateY: wormTranslateY },
                  { rotate: wormRotate },
                ],
              },
            ]}
          >
            <View style={styles.fullWorm}>
              {WORM_SEGMENTS.map((segment) => {
                const waveOffset = slitherCycle.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, segment.wave, 0],
                });

                return (
                  <Animated.View
                    key={segment.key}
                    style={[
                      styles.wormSegment,
                      {
                        left: segment.left,
                        top: segment.top,
                        width: segment.size,
                        height: segment.size,
                        borderRadius: segment.size / 2,
                        backgroundColor: WORM_COLORS.body,
                        borderColor: WORM_COLORS.outline,
                        transform: [{ translateY: waveOffset }],
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.wormSegmentHighlight,
                        {
                          width: segment.size * 0.42,
                          height: segment.size * 0.24,
                          backgroundColor: WORM_COLORS.highlight,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.wormSegmentBelly,
                        {
                          width: segment.bellyWidth,
                          height: segment.bellyHeight,
                          backgroundColor: WORM_COLORS.belly,
                        },
                      ]}
                    />
                  </Animated.View>
                );
              })}
              <View
                style={[
                  styles.wormBridge,
                  { backgroundColor: WORM_COLORS.body },
                ]}
              >
                <View
                  style={[
                    styles.wormSegmentHighlight,
                    styles.wormBridgeHighlight,
                    { backgroundColor: WORM_COLORS.highlight },
                  ]}
                />
                <View
                  style={[
                    styles.wormSegmentBelly,
                    styles.wormBridgeBelly,
                    { backgroundColor: WORM_COLORS.belly },
                  ]}
                />
              </View>
              <View style={styles.wormHead}>
                <ExpoImage
                  source={AppTheme.assets.worm}
                  style={styles.wormHeadSvg}
                  contentFit="contain"
                />
              </View>
            </View>
          </Animated.View>

          <Pressable
            style={[styles.skipButton, { bottom: skipButtonBottom }]}
            onPress={() => closeCelebration(autoCloseTimeoutRef, onClose)}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
