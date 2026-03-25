type RewardedAdCallbacks = {
  onClosed?: () => void;
  onError?: () => void;
  onLoaded?: () => void;
  onLoading?: () => void;
  onRewardEarned?: () => void;
};

type InterstitialAdCallbacks = {
  onClosed?: () => void;
  onError?: () => void;
  onLoaded?: () => void;
  onLoading?: () => void;
};

type GoogleMobileAdsModule = typeof import("react-native-google-mobile-ads");

function getGoogleMobileAdsModule() {
  try {
    return require("react-native-google-mobile-ads") as GoogleMobileAdsModule;
  } catch {
    return null;
  }
}

function createRequestOptions() {
  return { requestNonPersonalizedAdsOnly: true };
}

export async function initializeAds() {
  const mobileAdsModule = getGoogleMobileAdsModule();
  if (!mobileAdsModule) return;

  const { default: mobileAds } = mobileAdsModule;
  try {
    await mobileAds().initialize();
  } catch {
    return;
  }
}

export async function showRewardedAd(
  callbacks: RewardedAdCallbacks = {}
): Promise<boolean> {
  const mobileAdsModule = getGoogleMobileAdsModule();
  if (!mobileAdsModule) {
    callbacks.onError?.();
    callbacks.onClosed?.();
    return false;
  }

  const {
    AdEventType,
    RewardedAd,
    RewardedAdEventType,
    TestIds,
  } = mobileAdsModule;

  callbacks.onLoading?.();

  return new Promise<boolean>((resolve) => {
    let rewardEarned = false;
    let settled = false;
    const rewardedAd = RewardedAd.createForAdRequest(
      TestIds.REWARDED,
      createRequestOptions()
    );

    function finish(result: boolean) {
      if (settled) return;
      settled = true;
      resolve(result);
    }

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        callbacks.onLoaded?.();
        void rewardedAd.show().catch(() => {
          callbacks.onError?.();
          finish(false);
          unsubscribeAll();
        });
      }
    );

    const unsubscribeReward = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        rewardEarned = true;
        callbacks.onRewardEarned?.();
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        callbacks.onClosed?.();
        finish(rewardEarned);
        unsubscribeAll();
      }
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        callbacks.onError?.();
        callbacks.onClosed?.();
        finish(false);
        unsubscribeAll();
      }
    );

    function unsubscribeAll() {
      unsubscribeLoaded();
      unsubscribeReward();
      unsubscribeClosed();
      unsubscribeError();
    }

    rewardedAd.load();
  });
}

export async function showInterstitialAd(
  callbacks: InterstitialAdCallbacks = {}
): Promise<boolean> {
  const mobileAdsModule = getGoogleMobileAdsModule();
  if (!mobileAdsModule) {
    callbacks.onError?.();
    callbacks.onClosed?.();
    return false;
  }

  const {
    AdEventType,
    InterstitialAd,
    TestIds,
  } = mobileAdsModule;

  callbacks.onLoading?.();

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const interstitialAd = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL,
      createRequestOptions()
    );

    function finish(result: boolean) {
      if (settled) return;
      settled = true;
      resolve(result);
    }

    const unsubscribeLoaded = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        callbacks.onLoaded?.();
        void interstitialAd.show().catch(() => {
          callbacks.onError?.();
          finish(false);
          unsubscribeAll();
        });
      }
    );

    const unsubscribeClosed = interstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        callbacks.onClosed?.();
        finish(true);
        unsubscribeAll();
      }
    );

    const unsubscribeError = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      () => {
        callbacks.onError?.();
        callbacks.onClosed?.();
        finish(false);
        unsubscribeAll();
      }
    );

    function unsubscribeAll() {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    }

    interstitialAd.load();
  });
}
