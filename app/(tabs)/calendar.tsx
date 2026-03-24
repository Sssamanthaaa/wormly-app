import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  formatCalendarDateKey,
  type WormMoodLevel,
} from "@/constants/calendar-data";
import { AppTheme } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { calendarStyles as styles } from "@/styles/screens/calendar";

type CalendarWormDisplay = WormMoodLevel | "empty";

const today = new Date();
const calendarCellCount = 42;

function getCalendarCells(visibleMonth: Date) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];

  for (let index = 0; index < firstWeekDay; index++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  while (cells.length < calendarCellCount) cells.push(null);

  return cells;
}

function getHabitMood(
  date: Date,
  calendarEntriesByDate: Record<string, { mood: WormMoodLevel }>
): WormMoodLevel | null {
  return calendarEntriesByDate[formatCalendarDateKey(date)]?.mood ?? null;
}

function MoodWorm({
  mood,
  variant = "calendar",
}: {
  mood: CalendarWormDisplay;
  variant?: "calendar" | "legend";
}) {
  const wormColors = AppTheme.wormMoodColors[mood];
  const isLegend = variant === "legend";

  return (
    <View style={[styles.worm, isLegend && styles.legendWorm]}>
      <View
        style={[
          styles.wormSegmentTail,
          isLegend && styles.legendWormSegmentTail,
          { backgroundColor: wormColors.body },
        ]}
      />
      <View
        style={[
          styles.wormSegmentMiddle,
          isLegend && styles.legendWormSegmentMiddle,
          { backgroundColor: wormColors.body },
        ]}
      />
      <View
        style={[
          styles.wormHead,
          isLegend && styles.legendWormHead,
          { backgroundColor: wormColors.body },
        ]}
      >
        <View
          style={[
            styles.wormBelly,
            isLegend && styles.legendWormBelly,
            { backgroundColor: wormColors.belly },
          ]}
        />
        <View style={styles.wormEyesRow}>
          <View style={styles.wormEye} />
          <View style={styles.wormEye} />
        </View>
      </View>
      <View
        style={[
          styles.wormAccentLeft,
          isLegend && styles.legendWormAccentLeft,
          { backgroundColor: wormColors.accent },
        ]}
      />
      <View
        style={[
          styles.wormAccentRight,
          isLegend && styles.legendWormAccentRight,
          { backgroundColor: wormColors.accent },
        ]}
      />
    </View>
  );
}

export default function CalendarScreen() {
  const { calendarEntriesByDate } = useUserData();
  const { locale, t } = useAppTranslation();
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const weekDays = Array.from({ length: 7 }, (_, index) =>
    new Date(2024, 0, 7 + index).toLocaleDateString(locale, {
      weekday: "short",
    })
  );
  const calendarLegend = [
    { mood: "empty", label: t("calendarLegendNoData") },
    { mood: "low", label: t("calendarLegendAlmostNone") },
    { mood: "medium", label: t("calendarLegendSomeHabits") },
    { mood: "high", label: t("calendarLegendAllHabits") },
  ] satisfies { mood: CalendarWormDisplay; label: string }[];
  const cells = getCalendarCells(visibleMonth);
  const monthLabel = visibleMonth.toLocaleDateString(locale, { month: "long" });
  const yearLabel = visibleMonth.toLocaleDateString(locale, { year: "numeric" });

  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.card}>
        <View style={styles.header}>
          <Pressable
            style={styles.navButton}
            onPress={() =>
              setVisibleMonth(
                new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth() - 1,
                  1
                )
              )
            }
          >
            <Ionicons name="chevron-back" size={18} />
          </Pressable>

          <View style={styles.titleGroup}>
            <Text style={styles.title}>{monthLabel}</Text>
            <Text style={styles.yearLabel}>{yearLabel}</Text>
          </View>

          <Pressable
            style={styles.navButton}
            onPress={() =>
              setVisibleMonth(
                new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth() + 1,
                  1
                )
              )
            }
          >
            <Ionicons name="chevron-forward" size={18} />
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day, index) => {
            const isToday =
              day !== null &&
              visibleMonth.getFullYear() === today.getFullYear() &&
              visibleMonth.getMonth() === today.getMonth() &&
              day === today.getDate();

            const cellDate = day
              ? new Date(
                  visibleMonth.getFullYear(),
                  visibleMonth.getMonth(),
                  day
                )
              : null;
            const mood = cellDate
              ? getHabitMood(cellDate, calendarEntriesByDate)
              : null;

            return (
              <View key={index} style={styles.cell}>
                {day ? (
                  <View style={styles.cellInner}>
                    <View
                      style={[
                        styles.dayCircle,
                        isToday && styles.todayCircle,
                      ]}
                    >
                      <Text
                        style={[styles.dayText, isToday && styles.todayText]}
                      >
                        {day}
                      </Text>
                    </View>

                    <MoodWorm mood={mood ?? "empty"} />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>

      <View style={[commonStyles.card, styles.legendCard]}>
        <Text style={styles.legendTitle}>{t("calendarWormGuide")}</Text>

        <View style={styles.legendList}>
          {calendarLegend.map((item) => (
            <View key={item.mood} style={styles.legendItem}>
              <MoodWorm mood={item.mood} variant="legend" />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
