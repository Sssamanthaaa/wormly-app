import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const launchScreenStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: AppTheme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  brandBlock: {
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  logoWrap: {
    width: 112,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 92,
    height: 110,
  },
  wordmark: {
    width: 196,
    height: 74,
  },
});
