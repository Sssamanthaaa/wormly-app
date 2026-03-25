import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams, type Href } from "expo-router";
import { AppTheme } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { showRewardedAd } from "../../services/AdService";
import { useUserData } from "@/store/user-data";
import { adBridgeStyles as styles } from "@/styles/screens/adbridge";

export default function AdBridgeScreen() {
  const { t } = useAppTranslation();
  const { buttonPressed, redirectPage, unlockTarget } = useLocalSearchParams<{
    buttonPressed?: string;
    redirectPage?: string;
    unlockTarget?: string;
  }>();
  const {
    tokenCount,
    awardToken,
    redeemToken,
    unlockProgressInsights,
    unlockProfileAccount,
  } =
    useUserData();
  const canRedeemToken = tokenCount > 0;
  const isWeb = Platform.OS === "web";
  const usesExpoGo = Constants.appOwnership === "expo";
  const isProgressInsightsUnlock = unlockTarget === "progress-insights";
  const isProfileAccountUnlock = unlockTarget === "profile-account";
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [watchAdMessage, setWatchAdMessage] = useState(
    isWeb
      ? t("adbridgeWebMessage")
      : usesExpoGo
      ? t("adbridgeExpoMessage")
      : t("adbridgeGoogleMessage")
  );

  const title = isProgressInsightsUnlock
    ? t("adbridgeUnlockHabitInsights")
    : isProfileAccountUnlock
      ? t("adbridgeUnlockAccountEditing")
      : t("adbridgeNeedTokenFirst");
  const actionLabel = buttonPressed || t("adbridgeDefaultAction");
  const copy = isProgressInsightsUnlock
    ? t("adbridgeUnlockCopy")
    : isProfileAccountUnlock
      ? t("adbridgeUnlockAccountCopy")
      : t("adbridgeNeedTokenCopy");

  async function handleWatchAdNow() {
    if (isLoadingAd) return;

    setIsLoadingAd(true);

    if (usesExpoGo && !isWeb) {
      awardToken(1);
      setWatchAdMessage(t("adbridgeMockRewardGranted"));
      setIsLoadingAd(false);
      return;
    }

    await showRewardedAd({
      onLoading: () => setWatchAdMessage(t("adbridgeLoadingRewarded")),
      onLoaded: () => setWatchAdMessage(t("adbridgeOpeningRewarded")),
      onRewardEarned: () => {
        awardToken(1);
        setWatchAdMessage(
          isWeb ? t("adbridgeWebRewardGranted") : t("adbridgeRewardEarned")
        );
      },
      onClosed: () => setIsLoadingAd(false),
      onError: () => {
        setWatchAdMessage(t("adbridgeCouldNotLoad"));
        setIsLoadingAd(false);
      },
    });
  }

  function handleRedeemToken() {
    if (!canRedeemToken || isLoadingAd) return;

    const wasRedeemed = redeemToken();
    if (!wasRedeemed) return;

    if (isProgressInsightsUnlock) {
      unlockProgressInsights();
    }

    if (isProfileAccountUnlock) {
      unlockProfileAccount();
    }

    setWatchAdMessage(t("adbridgeTokenRedeemed"));

    if (redirectPage) {
      router.replace(String(redirectPage) as Href);
      return;
    }

    router.back();
  }

  return (
    <View style={styles.page}>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />

      {!usesExpoGo && (
        <BlurView intensity={22} tint="light" style={styles.absoluteFill} />
      )}
      <Pressable
        style={[styles.scrim, usesExpoGo && styles.scrimFallback]}
        onPress={() => router.back()}
      />

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.popup}>
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons
              name="close"
              size={18}
              color={AppTheme.colors.successText}
            />
          </Pressable>
          <Text style={styles.token}>{AppTheme.emojis.token}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.pressedAction}>{actionLabel}</Text>
          <Text style={styles.copy}>{copy}</Text>
          <Text style={styles.helperText}>{watchAdMessage}</Text>

          <View style={styles.tokenStatus}>
            <Text style={styles.tokenStatusLabel}>
              {t("adbridgeAvailableTokens")}
            </Text>
            <Text style={styles.tokenStatusValue}>{tokenCount}</Text>
          </View>

          <View style={styles.buttonStack}>
            <Pressable
              style={[
                styles.button,
                styles.primaryButton,
                isLoadingAd && styles.loadingButton,
              ]}
              onPress={handleWatchAdNow}
              disabled={isLoadingAd}
            >
              <Text style={styles.primaryButtonText}>
                {isLoadingAd
                  ? t("adbridgeLoadingTestAd")
                  : t("adbridgeWatchAdNow")}
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.secondaryButton,
                (!canRedeemToken || isLoadingAd) && styles.disabledButton,
              ]}
              onPress={handleRedeemToken}
              disabled={!canRedeemToken || isLoadingAd}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  (!canRedeemToken || isLoadingAd) && styles.disabledButtonText,
                ]}
              >
                {t("adbridgeRedeemToken")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
