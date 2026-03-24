import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const progressStyles = StyleSheet.create({
  page: {
    backgroundColor: AppTheme.colors.white,
  },
  content: {
    gap: 16,
  },
  streakCard: {
    backgroundColor: "#EFF6E8",
    borderWidth: 0,
    borderColor: "transparent",
    padding: 16,
  },
  cardTitle: {
    fontSize: AppTheme.typography.titleMd,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  streakSummary: {
    fontSize: AppTheme.typography.body,
    lineHeight: 22,
    color: AppTheme.colors.textSubtle,
    marginTop: 6,
    fontFamily: AppTheme.fonts.regular,
  },
  streakGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  streakStatCard: {
    flex: 1,
    minHeight: 132,
    borderRadius: 22,
    padding: 14,
    borderWidth: 0,
    alignItems: "center",
    backgroundColor: AppTheme.colors.white,
  },
  streakStatWarm: {
    backgroundColor: AppTheme.colors.white,
  },
  streakStatCool: {
    backgroundColor: AppTheme.colors.white,
  },
  streakIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  streakIconWrapWarm: {
    backgroundColor: AppTheme.colors.peachFrost,
  },
  streakIconWrapCool: {
    backgroundColor: AppTheme.colors.icedBlue,
  },
  streakValue: {
    fontSize: 44,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
    marginTop: 16,
    textAlign: "center",
  },
  streakLabel: {
    fontSize: AppTheme.typography.titleSm,
    fontFamily: AppTheme.fonts.semibold,
    color: AppTheme.colors.textSubtle,
    marginTop: 4,
    textAlign: "center",
  },
  streakHint: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textSubtle,
    marginTop: 6,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: AppTheme.fonts.regular,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.regular,
  },
  badge: {
    fontSize: AppTheme.typography.titleSm,
    fontFamily: AppTheme.fonts.bold,
    marginTop: 4,
    color: AppTheme.colors.text,
  },
  lockCard: {
    marginTop: 12,
    backgroundColor: AppTheme.colors.white,
    borderRadius: AppTheme.radii.cardMd,
    paddingHorizontal: 22,
    paddingVertical: 24,
    alignItems: "center",
    borderWidth: 0,
    borderColor: "transparent",
  },
  lockIcon: {
    fontSize: 24,
    marginBottom: 12,
  },
  lockTitle: {
    fontSize: AppTheme.typography.titleMd,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  lockCopy: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
    maxWidth: 240,
  },
  unlockButton: {
    marginTop: 16,
    minHeight: 46,
    borderRadius: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppTheme.colors.primary,
  },
  unlockButtonText: {
    color: AppTheme.colors.white,
    fontSize: 14,
    fontFamily: AppTheme.fonts.bold,
  },
  insightCard: {
    borderRadius: AppTheme.radii.cardMd,
    padding: 14,
    marginTop: 12,
    gap: 10,
    borderWidth: 0,
  },
  insightsSection: {
    gap: 0,
  },
  comingSoonCard: {
    backgroundColor: "#FFF7DC",
    borderWidth: 0,
    borderColor: "transparent",
  },
  insightLabel: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.regular,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  insightIcon: {
    fontSize: 26,
  },
  insightCopy: {
    flex: 1,
  },
  insightName: {
    fontSize: AppTheme.typography.titleSm,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  insightMeta: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textSubtle,
    marginTop: 2,
    fontFamily: AppTheme.fonts.regular,
  },
  insightPercent: {
    fontSize: AppTheme.typography.titleMd,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.successText,
  },
  comingSoonCopy: {
    fontSize: AppTheme.typography.body,
    lineHeight: 22,
    color: AppTheme.colors.textSubtle,
    marginTop: 8,
    fontFamily: AppTheme.fonts.regular,
  },
});
