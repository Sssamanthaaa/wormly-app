import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

const calendarColumnWidth = "14.2857%" as const;
const calendarRowCount = 6;
const calendarCellHeight = 72;

export const calendarStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  titleGroup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: AppTheme.typography.titleXl,
    fontFamily: AppTheme.fonts.bold,
    textAlign: "center",
    color: AppTheme.colors.text,
  },
  yearLabel: {
    fontSize: AppTheme.typography.eyebrow,
    fontFamily: AppTheme.fonts.medium,
    color: AppTheme.colors.textMuted,
    textAlign: "center",
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppTheme.colors.primarySoftAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  weekRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  weekDay: {
    flexBasis: calendarColumnWidth,
    maxWidth: calendarColumnWidth,
    textAlign: "center",
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontFamily: AppTheme.fonts.semibold,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    minHeight: calendarRowCount * calendarCellHeight,
  },
  cell: {
    flexBasis: calendarColumnWidth,
    maxWidth: calendarColumnWidth,
    height: calendarCellHeight,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cellInner: {
    alignItems: "center",
    gap: 6,
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppTheme.colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  todayCircle: {
    backgroundColor: AppTheme.colors.primary,
  },
  dayText: {
    fontFamily: AppTheme.fonts.bold,
    color: AppTheme.colors.textLight,
  },
  todayText: {
    color: AppTheme.colors.white,
  },
  worm: {
    width: 28,
    height: 22,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  wormSegmentTail: {
    width: 9,
    height: 9,
    borderRadius: 999,
    marginRight: -2,
  },
  legendWorm: {
    width: 36,
    height: 24,
  },
  wormSegmentMiddle: {
    width: 11,
    height: 11,
    borderRadius: 999,
    marginRight: -2,
  },
  wormHead: {
    width: 14,
    height: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  wormBelly: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 999,
    bottom: 1,
  },
  wormEyesRow: {
    flexDirection: "row",
    gap: 2,
    marginTop: -1,
  },
  wormEye: {
    width: 2,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#1D1D1D",
  },
  wormAccentLeft: {
    position: "absolute",
    top: 1,
    right: 8,
    width: 3,
    height: 3,
    borderRadius: 999,
  },
  wormAccentRight: {
    position: "absolute",
    top: 0,
    right: 2,
    width: 3,
    height: 3,
    borderRadius: 999,
  },
  legendWormSegmentTail: {
    width: 10,
    height: 10,
  },
  legendWormSegmentMiddle: {
    width: 12,
    height: 12,
  },
  legendWormHead: {
    width: 16,
    height: 16,
  },
  legendWormBelly: {
    width: 9,
    height: 9,
    bottom: 1,
  },
  legendWormAccentLeft: {
    top: 1,
    right: 10,
    width: 3,
    height: 3,
  },
  legendWormAccentRight: {
    top: 0,
    right: 3,
    width: 3,
    height: 3,
  },
  legendCard: {
    paddingVertical: 10,
  },
  legendTitle: {
    fontSize: 15,
    fontFamily: AppTheme.fonts.bold,
    marginBottom: 6,
    color: AppTheme.colors.text,
  },
  legendList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "48%",
  },
  legendText: {
    fontSize: 12,
    color: AppTheme.colors.textLight,
    fontFamily: AppTheme.fonts.regular,
  },
});
