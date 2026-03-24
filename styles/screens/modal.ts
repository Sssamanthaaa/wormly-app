import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.page,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    gap: 10,
  },
  copy: {
    fontSize: AppTheme.typography.body,
    lineHeight: 22,
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
  },
  link: {
    marginTop: 15,
    paddingVertical: 12,
  },
  linkText: {
    fontSize: AppTheme.typography.body,
    color: AppTheme.colors.text,
    fontFamily: AppTheme.fonts.bold,
  },
});
