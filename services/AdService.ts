import { Platform } from "react-native";

const adService =
  Platform.OS === "web"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("./AdService.web")
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("./AdService.native");

export const initializeAds = adService.initializeAds as typeof import("./AdService.native").initializeAds;
export const showInterstitialAd = adService.showInterstitialAd as typeof import("./AdService.native").showInterstitialAd;
export const showRewardedAd = adService.showRewardedAd as typeof import("./AdService.native").showRewardedAd;
