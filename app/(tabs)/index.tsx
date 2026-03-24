import { ScrollView, Text, View, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AllHabitsCompletePopup from "@/components/AllHabitsCompletePopup";
import { getHabitAccent } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { homeStyles as styles } from "@/styles/screens/home";

function getCurrentWeek(referenceDate: Date, locale: string) {
  const startOfWeek = new Date(referenceDate);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    return {
      key: index,
      label: date.toLocaleDateString(locale, { weekday: "short" }),
      date,
    };
  });
}

export default function Home() {
  const { habits, profile, incrementHabit } = useUserData();
  const { locale, t } = useAppTranslation();
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);
  const [showCelebrationMessage, setShowCelebrationMessage] = useState(false);
  const wasAllCompletedRef = useRef(false);
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? t("homeGoodMorning") : t("homeGoodAfternoon");
  const currentWeek = getCurrentWeek(now, locale);
  const allHabitsCompleted =
    habits.length > 0 && habits.every((habit) => habit.current >= habit.goal);

  function handleOpenCelebrationPopup() {
    setShowCelebrationMessage(false);
    setShowCelebrationPopup(true);
  }

  function handleCloseCelebrationPopup(showHomeMessage = false) {
    setShowCelebrationPopup(false);
    setShowCelebrationMessage(showHomeMessage);
  }

  useEffect(() => {
    if (allHabitsCompleted && !wasAllCompletedRef.current) {
      setShowCelebrationPopup(true);
      setShowCelebrationMessage(false);
    }

    if (!allHabitsCompleted) {
      setShowCelebrationPopup(false);
      setShowCelebrationMessage(false);
    }

    wasAllCompletedRef.current = allHabitsCompleted;
  }, [allHabitsCompleted]);

  return (
    <View style={styles.page}>
      <ScrollView
        style={commonStyles.scrollPage}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingLabel}>{greeting}</Text>
          <Text style={styles.greetingName}>{profile.name}</Text>
        </View>

        <Pressable
          style={styles.testPopupButton}
          onPress={handleOpenCelebrationPopup}
        >
          <Text style={styles.testPopupButtonText}>
            {t("homeTestPopupButton")}
          </Text>
        </Pressable>

        <View style={styles.weekStrip}>
          {currentWeek.map((day) => {
            const isToday = day.date.toDateString() === now.toDateString();

            return (
              <View style={styles.dayPill} key={day.key}>
                <View style={[styles.dayCircle, isToday && styles.dayCircleToday]}>
                  <Text style={[styles.dayDate, isToday && styles.dayDateToday]}>
                    {day.date.getDate()}
                  </Text>
                </View>
                <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
                  {day.label}
                </Text>
              </View>
            );
          })}
        </View>

        {showCelebrationMessage && (
          <View style={styles.celebrationMessageCard}>
            <Text style={styles.celebrationMessageTitle}>
              {t("homeAllHabitsCompleteTitle")}
            </Text>
            <Text style={styles.celebrationMessageCopy}>
              {t("homeAllHabitsCompleteCopy")}
            </Text>
          </View>
        )}

        <View style={styles.habitStack}>
          {habits.map((habit) => {
            const colors = getHabitAccent(habit.color);
            const progressPercent = Math.round((habit.current / habit.goal) * 100);
            const progressLabel = `${habit.current}/${habit.goal} ${habit.unit}`;

            return (
              <View
                key={habit.name}
                style={[styles.habitCard, { backgroundColor: colors.card }]}
              >
                <View
                  style={[
                    styles.habitProgressFillBackground,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: colors.fill,
                    },
                  ]}
                />

                <View style={styles.habitCardContent}>
                  <View style={styles.habitMain}>
                    <View style={styles.habitMainRow}>
                      <Text style={styles.habitIcon}>{habit.icon}</Text>

                      <View style={styles.habitCopy}>
                        <Text style={styles.habitTitle}>{habit.name}</Text>
                        <Text style={styles.habitSubtitle}>{progressLabel}</Text>
                      </View>
                    </View>

                    <View style={styles.habitProgressRow}>
                      <View style={styles.habitProgressTrack}>
                        <View
                          style={[
                            styles.habitProgressValue,
                            {
                              width: `${progressPercent}%`,
                              backgroundColor: colors.progress,
                            },
                          ]}
                        />
                      </View>

                      <Text style={styles.habitPercent}>{progressPercent}%</Text>
                    </View>
                  </View>

                  <Pressable
                    style={[
                      styles.habitAddButton,
                      { backgroundColor: colors.button },
                    ]}
                    onPress={() => incrementHabit(habit.id)}
                  >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {showCelebrationPopup && (
        <AllHabitsCompletePopup onClose={handleCloseCelebrationPopup} />
      )}
    </View>
  );
}
