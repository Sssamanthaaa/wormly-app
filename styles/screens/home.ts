import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const homeStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  greetingBlock: {
    marginBottom: 30,
  },
  greetingLabel: {
    fontSize: AppTheme.typography.titleMd,
    color: AppTheme.colors.textSubtle,
    marginBottom: 4,
    fontFamily: AppTheme.fonts.regular,
  },
  greetingName: {
    fontSize: AppTheme.typography.titleHero,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
  },
  testPopupButton: {
    alignSelf: "flex-start",
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: AppTheme.colors.surface,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  testPopupButtonText: {
    fontSize: 13,
    fontFamily: AppTheme.fonts.semibold,
    color: AppTheme.colors.text,
  },
  weekStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  celebrationMessageCard: {
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: "#F7FBEF",
    borderWidth: 1,
    borderColor: "#D3E2BE",
    shadowColor: "#43633D",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  celebrationMessageTitle: {
    fontSize: AppTheme.typography.titleLg,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
    marginBottom: 6,
  },
  celebrationMessageCopy: {
    fontSize: AppTheme.typography.body,
    lineHeight: 22,
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
  },
  dayPill: {
    alignItems: "center",
    flex: 1,
  },
  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppTheme.colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  dayCircleToday: {
    backgroundColor: AppTheme.colors.primary,
  },
  dayDate: {
    fontSize: 12,
    fontFamily: AppTheme.fonts.semibold,
    color: AppTheme.colors.textSubtle,
  },
  dayDateToday: {
    color: AppTheme.colors.white,
  },
  dayLabel: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.medium,
  },
  dayLabelToday: {
    color: AppTheme.colors.text,
    fontFamily: AppTheme.fonts.bold,
  },
  habitStack: {
    gap: 16,
  },
  habitCard: {
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  habitProgressFillBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 24,
  },
  habitCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    gap: 16,
  },
  habitMain: {
    flex: 1,
  },
  habitMainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  habitIcon: {
    fontSize: 28,
  },
  habitCopy: {
    flex: 1,
  },
  habitTitle: {
    fontSize: AppTheme.typography.titleMd,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.text,
    marginBottom: 4,
  },
  habitSubtitle: {
    fontSize: AppTheme.typography.label,
    color: AppTheme.colors.textSubtle,
    fontFamily: AppTheme.fonts.regular,
  },
  habitProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  habitProgressTrack: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.65)",
    overflow: "hidden",
  },
  habitProgressValue: {
    height: "100%",
    borderRadius: 999,
  },
  habitPercent: {
    width: 40,
    textAlign: "right",
    fontSize: 11,
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.textStrong,
  },
  habitAddButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
