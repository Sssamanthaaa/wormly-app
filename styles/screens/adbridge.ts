import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const adBridgeStyles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  page: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(24, 34, 28, 0.14)",
  },
  scrimFallback: {
    backgroundColor: "rgba(24, 34, 28, 0.28)",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: AppTheme.spacing.pageHorizontal,
  },
  popup: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: AppTheme.colors.successSoft,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: AppTheme.colors.successBorder,
    alignItems: "center",
    shadowColor: AppTheme.colors.successText,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.surface,
  },
  token: {
    fontSize: 34,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.successText,
    textAlign: "center",
    marginBottom: 10,
  },
  pressedAction: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.success,
    textAlign: "center",
    marginBottom: 8,
  },
  copy: {
    fontSize: AppTheme.typography.body,
    lineHeight: 22,
    color: AppTheme.colors.successTextMuted,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: AppTheme.fonts.regular,
  },
  helperText: {
    fontSize: 13,
    lineHeight: 19,
    color: AppTheme.colors.successText,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: AppTheme.fonts.regular,
  },
  tokenStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: AppTheme.colors.successBorder,
  },
  tokenStatusLabel: {
    fontSize: 13,
    color: "#4D6A52",
    fontFamily: AppTheme.fonts.regular,
  },
  tokenStatusValue: {
    fontSize: 16,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.successText,
  },
  buttonStack: {
    width: "100%",
    gap: 10,
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: AppTheme.colors.success,
  },
  secondaryButton: {
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppTheme.colors.successBorder,
  },
  disabledButton: {
    backgroundColor: AppTheme.colors.disabledSoft,
    borderColor: AppTheme.colors.disabledBorder,
  },
  loadingButton: {
    opacity: 0.85,
  },
  primaryButtonText: {
    color: AppTheme.colors.white,
    fontSize: 15,
    fontFamily: AppTheme.fonts.bold,
  },
  secondaryButtonText: {
    color: AppTheme.colors.success,
    fontSize: 15,
    fontFamily: AppTheme.fonts.bold,
  },
  disabledButtonText: {
    color: AppTheme.colors.disabledText,
  },
});
