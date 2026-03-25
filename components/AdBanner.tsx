import { Platform, StyleSheet, Text, View } from "react-native";

type AdBannerProps = {
  label?: string;
  size?: string;
  unitId?: string;
};

export default function AdBanner({
  label = "Ad placeholder",
  size = "ANCHORED_ADAPTIVE_BANNER",
  unitId,
}: AdBannerProps) {
  if (Platform.OS === "web") {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{label}</Text>
      </View>
    );
  }

  let nativeAds: typeof import("react-native-google-mobile-ads") | null = null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    nativeAds = require("react-native-google-mobile-ads") as typeof import("react-native-google-mobile-ads");
  } catch {
    nativeAds = null;
  }

  if (!nativeAds) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{label}</Text>
      </View>
    );
  }

  const { BannerAd, TestIds } = nativeAds;

  return (
    <BannerAd
      unitId={unitId ?? TestIds.BANNER}
      size={size}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    minHeight: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9D9DE",
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  placeholderText: {
    fontSize: 13,
    color: "#6E6E6E",
  },
});
