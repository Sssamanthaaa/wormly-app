import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const addScreenStyles = StyleSheet.create({
  section: {
    gap: 14,
  },
  currentHabitStack: {
    gap: 12,
  },
  eyebrow: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.semibold,
    letterSpacing: 0.3,
  },
  tokenPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: AppTheme.colors.tokenBg,
    borderRadius: AppTheme.radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: AppTheme.colors.tokenBorder,
  },
  tokenCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppTheme.colors.tokenFill,
    alignItems: "center",
    justifyContent: "center",
  },
  tokenIcon: {
    fontSize: 14,
  },
  tokenCount: {
    fontSize: 14,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.tokenText,
  },
  customButton: {
    minHeight: 96,
    borderRadius: AppTheme.radii.card,
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customCopy: {
    flex: 1,
    paddingRight: 16,
  },
  customTitle: {
    color: AppTheme.colors.text,
    fontFamily: AppTheme.fonts.regular,
  },
  customPlusWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppTheme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  customPlus: {
    color: AppTheme.colors.white,
    fontSize: 26,
    fontFamily: AppTheme.fonts.bold,
    lineHeight: 26,
  },
  currentHabitCard: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currentHabitBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  currentHabitIcon: {
    fontSize: 24,
  },
  currentHabitCopy: {
    flex: 1,
  },
  currentHabitEditButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  currentHabitName: {
    fontSize: 16,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  currentHabitDetail: {
    fontSize: 13,
    color: AppTheme.colors.textSubtle,
    marginTop: 4,
    fontFamily: AppTheme.fonts.regular,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: AppTheme.radii.card,
    padding: 16,
    minHeight: 150,
    justifyContent: "space-between",
  },
  badgeWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: AppTheme.colors.white,
    fontSize: 24,
    fontFamily: AppTheme.fonts.bold,
  },
  cardName: {
    fontSize: 18,
    fontFamily: AppTheme.fonts.bold,
    marginTop: 18,
  },
  cardDetail: {
    fontSize: 14,
    color: AppTheme.colors.textSubtle,
    marginTop: 6,
    fontFamily: AppTheme.fonts.regular,
  },
});
