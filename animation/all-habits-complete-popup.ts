import { Animated, Easing } from "react-native";

const SLITHER_STEP_DURATION_MS = 560;
const WORM_TRAVEL_DURATION_MS = 3200;
const WORM_FADE_DURATION_MS = 420;
const BUTTERFLY_DELAY_MS = 1800;
const BUTTERFLY_FADE_IN_DURATION_MS = 220;
const BUTTERFLY_FLIGHT_DURATION_MS = 2200;
const BUTTERFLY_FADE_OUT_DURATION_MS = 260;

export const AUTO_CLOSE_DELAY_MS = 1200;

export const WORM_TRANSLATE_X_CONFIG = {
  inputRange: [0, 0.26, 0.56, 0.8, 1],
  outputRange: [0, 72, 118, 138, 144],
};

export const WORM_TRANSLATE_Y_CONFIG = {
  inputRange: [0, 0.26, 0.56, 0.8, 1],
  outputRange: [0, -10, -44, -138, -232],
};

export const WORM_ROTATE_CONFIG = {
  inputRange: [0, 0.22, 0.48, 0.72, 1],
  outputRange: ["8deg", "-8deg", "10deg", "-14deg", "-2deg"],
};

export const BUTTERFLY_TRANSLATE_X_CONFIG = {
  inputRange: [0, 0.22, 0.54, 1],
  outputRange: [0, -24, -88, -156],
};

export const BUTTERFLY_TRANSLATE_Y_CONFIG = {
  inputRange: [0, 0.2, 0.5, 0.78, 1],
  outputRange: [0, -32, -110, -164, -206],
};

export const BUTTERFLY_ROTATE_CONFIG = {
  inputRange: [0, 0.18, 0.4, 0.64, 0.82, 1],
  outputRange: ["-8deg", "10deg", "-16deg", "14deg", "-8deg", "6deg"],
};

export const BUTTERFLY_SCALE_CONFIG = {
  inputRange: [0, 0.18, 1],
  outputRange: [0.72, 0.92, 1],
};

export const BUTTERFLY_WING_SCALE_CONFIG = {
  inputRange: [0, 0.1, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.9, 1],
  outputRange: [0.7, 1.05, 0.74, 1.08, 0.76, 1.04, 0.78, 1.02, 0.82, 0.9],
};

export const WORM_COLORS = {
  body: "#69BE7F",
  belly: "#94CCA3",
  outline: "#1C4031",
  highlight: "rgba(255,255,255,0.16)",
} as const;

export const WORM_SEGMENTS = [
  { key: "tail", left: 2, top: 28, size: 12, bellyWidth: 6, bellyHeight: 3, wave: 1.4 },
  { key: "backA", left: 12, top: 24, size: 16, bellyWidth: 8, bellyHeight: 4, wave: -1.8 },
  { key: "backB", left: 26, top: 19, size: 20, bellyWidth: 11, bellyHeight: 5, wave: 1.6 },
  { key: "mid", left: 42, top: 16, size: 22, bellyWidth: 12, bellyHeight: 6, wave: -1.2 },
  { key: "front", left: 60, top: 17, size: 24, bellyWidth: 13, bellyHeight: 6, wave: 1.0 },
] as const;

type CelebrationSequenceValues = {
  butterflyOpacity: Animated.Value;
  butterflyProgress: Animated.Value;
  wormOpacity: Animated.Value;
  wormProgress: Animated.Value;
};

export function createSlitherLoop(slitherCycle: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(slitherCycle, {
        toValue: 1,
        duration: SLITHER_STEP_DURATION_MS,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
      Animated.timing(slitherCycle, {
        toValue: 0,
        duration: SLITHER_STEP_DURATION_MS,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ])
  );
}

export function createCelebrationSequence({
  butterflyOpacity,
  butterflyProgress,
  wormOpacity,
  wormProgress,
}: CelebrationSequenceValues) {
  return Animated.sequence([
    Animated.timing(wormProgress, {
      toValue: 1,
      duration: WORM_TRAVEL_DURATION_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(wormOpacity, {
      toValue: 0,
      duration: WORM_FADE_DURATION_MS,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }),
    Animated.delay(BUTTERFLY_DELAY_MS),
    Animated.parallel([
      Animated.timing(butterflyOpacity, {
        toValue: 1,
        duration: BUTTERFLY_FADE_IN_DURATION_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(butterflyProgress, {
        toValue: 1,
        duration: BUTTERFLY_FLIGHT_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]),
    Animated.timing(butterflyOpacity, {
      toValue: 0,
      duration: BUTTERFLY_FADE_OUT_DURATION_MS,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }),
  ]);
}
