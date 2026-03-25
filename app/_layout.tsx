import { useEffect } from "react";
import { Platform, Text, TextInput } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { AppTheme } from "@/constants/theme";
import { initializeAds } from "../services/AdService";
import { UserDataProvider } from "@/store/user-data";

void SplashScreen.preventAutoHideAsync();

type TextLikeComponent = {
  defaultProps?: {
    style?: unknown;
  };
};

const TextWithDefaults = Text as typeof Text & TextLikeComponent;
const TextInputWithDefaults = TextInput as typeof TextInput & TextLikeComponent;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (Platform.OS === "web" || Constants.appOwnership === "expo") return;

    void initializeAds();
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    const textDefaults = TextWithDefaults.defaultProps ?? {};
    TextWithDefaults.defaultProps = {
      ...textDefaults,
      style: [{ fontFamily: AppTheme.fonts.regular }, textDefaults.style],
    };

    const inputDefaults = TextInputWithDefaults.defaultProps ?? {};
    TextInputWithDefaults.defaultProps = {
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
