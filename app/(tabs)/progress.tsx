import { Pressable, ScrollView, View, Text } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  formatCalendarDateKey,
  type CalendarHabitEntry,
} from "@/constants/calendar-data";
import type { Habit } from "@/constants/habits";
import { AppTheme, getHabitAccent } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { progressStyles as styles } from "@/styles/screens/progress";

function isCompletedDay(entry?: CalendarHabitEntry) {
  return Boolean(entry && entry.completedHabits >= entry.totalHabits);
}

function getActiveStreak(
  calendarEntriesByDate: Record<string, CalendarHabitEntry>
) {
  let streak = 0;

  for (let index = 0; index < 7; index++) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);

    const entry = calendarEntriesByDate[formatCalendarDateKey(date)];
    if (!isCompletedDay(entry)) break;
    streak += 1;
  }

  return streak;
}

function getLongestStreak(
  calendarEntriesByDate: Record<string, CalendarHabitEntry>
) {
  let longestStreak = 0;
  let currentStreak = 0;

  for (let index = 6; index >= 0; index--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);

    const entry = calendarEntriesByDate[formatCalendarDateKey(date)];

    if (isCompletedDay(entry)) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return longestStreak;
}

function getCompletionPercent(habit: Habit) {
  if (habit.goal <= 0) return 0;
  return Math.round((habit.current / habit.goal) * 100);
}

function getHabitInsights(habits: Habit[]) {
  if (!habits.length) {
    return {
      needsMoreWork: undefined,
      closestToComplete: undefined,
    };
  }

  const rankedHabits = habits.map((habit) => ({
    habit,
    completionPercent: getCompletionPercent(habit),
    remaining: Math.max(habit.goal - habit.current, 0),
  }));

  const needsMoreWork = [...rankedHabits].sort((left, right) => {
    if (left.completionPercent !== right.completionPercent) {
      return left.completionPercent - right.completionPercent;
    }

    return right.remaining - left.remaining;
  })[0];

  const incompleteHabits = rankedHabits.filter(
    ({ completionPercent }) => completionPercent < 100
  );

  const closestToCompleteSource = incompleteHabits.length
    ? incompleteHabits
    : rankedHabits;

  const closestToComplete = [...closestToCompleteSource].sort((left, right) => {
    if (left.completionPercent !== right.completionPercent) {
      return right.completionPercent - left.completionPercent;
    }

    return left.remaining - right.remaining;
  })[0];

  return {
    needsMoreWork,
    closestToComplete,
  };
}

export default function ProgressScreen() {
  const { habits, calendarEntriesByDate, progressInsightsUnlocked } =
    useUserData();
  const { t } = useAppTranslation();
  const activeStreak = getActiveStreak(calendarEntriesByDate);
  const longestStreak = getLongestStreak(calendarEntriesByDate);
  const { needsMoreWork, closestToComplete } = getHabitInsights(habits);

  function openInsightsAdBridge() {
    router.push({
      pathname: "/add/adbridge",
      params: {
        buttonPressed: t("progressRevealHabitInsights"),
        redirectPage: "/progress",
        unlockTarget: "progress-insights",
      },
    });
  }

  return (
    <ScrollView
      style={[commonStyles.scrollPage, styles.page]}
      contentContainerStyle={[commonStyles.scrollContent, styles.content]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[commonStyles.card, styles.streakCard]}>
        <Text style={commonStyles.eyebrow}>{t("progressMomentum")}</Text>
        <Text style={styles.cardTitle}>{t("progressStreaks")}</Text>
        <Text style={styles.streakSummary}>
          {t("progressStreakSummary")}
        </Text>

        <View style={styles.streakGrid}>
          <View style={[styles.streakStatCard, styles.streakStatWarm]}>
            <View style={[styles.streakIconWrap, styles.streakIconWrapWarm]}>
              <Ionicons
                name="flame"
                size={26}
                color={AppTheme.colors.successText}
              />
            </View>
            <Text style={styles.streakValue}>{activeStreak}</Text>
            <Text style={styles.streakLabel}>{t("progressActiveStreak")}</Text>
            <Text style={styles.streakHint}>{t("progressDaysInRow")}</Text>
          </View>

          <View style={[styles.streakStatCard, styles.streakStatCool]}>
            <View style={[styles.streakIconWrap, styles.streakIconWrapCool]}>
              <Ionicons
                name="trophy"
                size={26}
                color={AppTheme.colors.successText}
              />
            </View>
            <Text style={styles.streakValue}>{longestStreak}</Text>
            <Text style={styles.streakLabel}>{t("progressBestStreak")}</Text>
            <Text style={styles.streakHint}>{t("progressPersonalRecord")}</Text>
          </View>
        </View>
      </View>

      <View style={styles.insightsSection}>
        {progressInsightsUnlocked ? (
          <>
            {needsMoreWork && (() => {
              const colors = getHabitAccent(needsMoreWork.habit.color);

              return (
                <View
                  style={[
                    styles.insightCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.badge,
                    },
                  ]}
                >
                  <Text style={[styles.insightLabel, { color: colors.text }]}>
                    {t("progressNeedsMoreWork")}
                  </Text>

                  <View style={styles.insightHeader}>
                    <Text style={styles.insightIcon}>
                      {needsMoreWork.habit.icon}
                    </Text>
                    <View style={styles.insightCopy}>
                      <Text style={[styles.insightName, { color: colors.text }]}>
                        {needsMoreWork.habit.name}
                      </Text>
                      <Text style={[styles.insightMeta, { color: colors.text }]}>
                        {needsMoreWork.habit.current}/{needsMoreWork.habit.goal}{" "}
                        {needsMoreWork.habit.unit}
                      </Text>
                    </View>
                    <Text style={[styles.insightPercent, { color: colors.text }]}>
                      {needsMoreWork.completionPercent}%
                    </Text>
                  </View>
                </View>
              );
            })()}

            {closestToComplete && (() => {
              const colors = getHabitAccent(closestToComplete.habit.color);

              return (
                <View
                  style={[
                    styles.insightCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.badge,
                    },
                  ]}
                >
                  <Text style={[styles.insightLabel, { color: colors.text }]}>
                    {t("progressMostLikelyToComplete")}
                  </Text>

                  <View style={styles.insightHeader}>
                    <Text style={styles.insightIcon}>
                      {closestToComplete.habit.icon}
                    </Text>
                    <View style={styles.insightCopy}>
                      <Text style={[styles.insightName, { color: colors.text }]}>
                        {closestToComplete.habit.name}
                      </Text>
                      <Text style={[styles.insightMeta, { color: colors.text }]}>
                        {closestToComplete.habit.current}/
                        {closestToComplete.habit.goal}{" "}
                        {closestToComplete.habit.unit}
                      </Text>
                    </View>
                    <Text style={[styles.insightPercent, { color: colors.text }]}>
                      {closestToComplete.completionPercent}%
                    </Text>
                  </View>
                </View>
              );
            })()}
          </>
        ) : (
          <View style={styles.lockCard}>
            <Text style={styles.lockIcon}>{AppTheme.emojis.token}</Text>
            <Text style={styles.lockTitle}>
              {t("progressUnlockHabitInsights")}
            </Text>
            <Text style={styles.lockCopy}>
              {t("progressUnlockHabitInsightsCopy")}
            </Text>

            <Pressable style={styles.unlockButton} onPress={openInsightsAdBridge}>
              <Text style={styles.unlockButtonText}>
                {t("progressWatchAdToUnlock")}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={[commonStyles.card, styles.comingSoonCard]}>
        <Text style={styles.cardTitle}>
          {t("progressMoreInsightsComingSoon")}
        </Text>
        <Text style={styles.comingSoonCopy}>
          {t("progressMoreInsightsComingSoonCopy")}
        </Text>
      </View>
    </ScrollView>
  );
}
