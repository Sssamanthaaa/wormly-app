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

function wait(durationMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export async function initializeAds() {
  return;
}

export async function showRewardedAd(
  callbacks: RewardedAdCallbacks = {}
): Promise<boolean> {
  callbacks.onLoading?.();
  await wait(150);
  callbacks.onLoaded?.();
  await wait(300);
  callbacks.onRewardEarned?.();
  callbacks.onClosed?.();
  return true;
}

export async function showInterstitialAd(
  callbacks: InterstitialAdCallbacks = {}
): Promise<boolean> {
  callbacks.onLoading?.();
  await wait(150);
  callbacks.onLoaded?.();
  await wait(300);
  callbacks.onClosed?.();
  return true;
}
