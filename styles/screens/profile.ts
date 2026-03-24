import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const profileStyles = StyleSheet.create({
  page: {
    gap: 16,
  },
  lockButton: {
    position: "absolute",
    top: 18,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    zIndex: 2,
  },
  lockButtonUnlocked: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 44,
    height: 44,
  },
  name: {
    fontSize: 22,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  email: {
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
  },
  label: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textMuted,
    marginTop: 10,
    marginBottom: 4,
    fontFamily: AppTheme.fonts.regular,
  },
  lockedHint: {
    marginTop: 8,
    marginBottom: 4,
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
  },
  input: {
    height: 50,
    borderRadius: AppTheme.radii.input,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    paddingHorizontal: 14,
    backgroundColor: AppTheme.colors.surface,
    fontFamily: AppTheme.fonts.regular,
  },
  inputLocked: {
    backgroundColor: AppTheme.colors.surfaceAlt,
    color: AppTheme.colors.textSubtle,
  },
  readonly: {
    height: 50,
    borderRadius: AppTheme.radii.input,
    backgroundColor: AppTheme.colors.surfaceAlt,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  languageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  languageChip: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: AppTheme.radii.pill,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    backgroundColor: AppTheme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  languageChipLocked: {
    backgroundColor: AppTheme.colors.surfaceAlt,
    borderColor: AppTheme.colors.borderSoft,
  },
  languageChipActive: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  languageChipText: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.semibold,
    color: AppTheme.colors.text,
  },
  languageChipTextLocked: {
    color: AppTheme.colors.textSubtle,
  },
  languageChipTextActive: {
    color: AppTheme.colors.white,
  },
  applyButton: {
    minHeight: 46,
    borderRadius: 14,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.primary,
  },
  applyButtonDisabled: {
    backgroundColor: AppTheme.colors.disabled,
  },
  applyButtonText: {
    color: AppTheme.colors.white,
    fontSize: 14,
    fontFamily: AppTheme.fonts.bold,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  helper: {
    marginTop: 10,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.regular,
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  filterCard: {
    width: "30%",
    alignItems: "center",
    gap: 6,
  },
  filterActive: {
    borderColor: AppTheme.colors.primary,
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  filterImage: {
    width: 32,
    height: 32,
  },
  filterText: {
    fontSize: 12,
    fontFamily: AppTheme.fonts.regular,
  },
});
