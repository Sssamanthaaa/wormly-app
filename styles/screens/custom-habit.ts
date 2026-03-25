import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const customHabitStyles = StyleSheet.create({
  content: {
    paddingTop: AppTheme.spacing.pageTop,
    paddingHorizontal: AppTheme.spacing.pageHorizontal,
    paddingBottom: 40,
  },
  closeButtonRow: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  headerTitle: {
    marginBottom: 20,
  },
  label: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textSubtle,
    marginTop: 10,
    fontFamily: AppTheme.fonts.regular,
  },
  input: {
    backgroundColor: AppTheme.colors.gray100,
    borderRadius: 12,
    padding: 10,
    marginTop: 4,
    fontFamily: AppTheme.fonts.regular,
  },
  multilineInput: {
    height: 80,
  },
  emojiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  emojiOption: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: AppTheme.colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  emojiOptionSelected: {
    backgroundColor: AppTheme.colors.previewCard,
    borderColor: AppTheme.colors.previewAccent,
  },
  emojiText: {
    fontSize: 24,
  },
  helperText: {
    marginTop: 8,
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.regular,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  flexField: {
    flex: 1,
  },
  previewCard: {
    backgroundColor: AppTheme.colors.previewCard,
    padding: 16,
    borderRadius: 16,
  },
  previewIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  previewSub: {
    color: AppTheme.colors.textSubtle,
    marginBottom: 10,
    fontFamily: AppTheme.fonts.regular,
  },
  progressTrack: {
    height: 8,
    backgroundColor: AppTheme.colors.gray200,
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: AppTheme.colors.previewFill,
  },
  percent: {
    marginTop: 6,
    fontFamily: AppTheme.fonts.semibold,
    color: AppTheme.colors.text,
  },
  button: {
    backgroundColor: AppTheme.colors.primary,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: AppTheme.colors.disabled,
  },
  buttonText: {
    color: AppTheme.colors.white,
    textAlign: "center",
    fontFamily: AppTheme.fonts.bold,
  },
});
