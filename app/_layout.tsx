import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import mobileAds from "react-native-google-mobile-ads";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { AppTheme } from "@/constants/theme";
import { UserDataProvider } from "@/store/user-data";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    void mobileAds().initialize();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const textDefaults = Text.defaultProps ?? {};
    Text.defaultProps = {
      ...textDefaults,
      style: [{ fontFamily: AppTheme.fonts.regular }, textDefaults.style],
    };

    const inputDefaults = TextInput.defaultProps ?? {};
    TextInput.defaultProps = {
      ...inputDefaults,
      style: [{ fontFamily: AppTheme.fonts.regular }, inputDefaults.style],
    };

    void SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserDataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserDataProvider>
  );
}
