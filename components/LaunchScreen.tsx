import { View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { AppTheme } from "@/constants/theme";
import { launchScreenStyles as styles } from "@/styles/components/launch-screen";

const wormlyWordmark = require("../assets/images/Wormly-logo.svg");

export default function LaunchScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.brandBlock}>
        <View style={styles.logoWrap}>
          <ExpoImage
            source={AppTheme.assets.worm}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <ExpoImage
          source={wormlyWordmark}
          style={styles.wordmark}
          contentFit="contain"
        />
      </View>
    </View>
  );
}
