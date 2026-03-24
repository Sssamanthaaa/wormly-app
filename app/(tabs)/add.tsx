import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppTheme, getHabitAccent } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { addScreenStyles as styles } from "@/styles/screens/add";

export default function AddHabit() {
  const { habits, tokenCount } = useUserData();
  const { t } = useAppTranslation();
  const popularHabits = [
    {
      name: t("addPopularWalk"),
      detail: t("addPopularWalkDetail"),
      accent: "bloodOrange",
      icon: AppTheme.emojis.walk,
    },
    {
      name: t("addPopularSwim"),
      detail: t("addPopularSwimDetail"),
      accent: "blueBerry",
      icon: AppTheme.emojis.swim,
    },
    {
      name: t("addPopularRead"),
      detail: t("addPopularReadDetail"),
      accent: "butterYellow",
      icon: AppTheme.emojis.book,
    },
  ] as const;

  function openAdBridge(buttonPressed: string, redirectPage: string) {
    router.push({
      pathname: "/add/adbridge",
      params: {
        buttonPressed,
        redirectPage,
      },
    });
  }

  function openEditHabit(habitId: string) {
    router.push({
      pathname: "/add/custom",
      params: {
        habitId,
      },
    });
  }

  return (
    <ScrollView
      style={commonStyles.scrollPage}
      contentContainerStyle={commonStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.sectionStack}>
        <View style={styles.section}>
          <View style={commonStyles.rowBetween}>
            <Text style={[commonStyles.eyebrow, styles.eyebrow]}>
              {t("addNewGoodHabit")}
            </Text>

            <View style={styles.tokenPill}>
              <View style={styles.tokenCircle}>
                <Text style={styles.tokenIcon}>{AppTheme.emojis.token}</Text>
              </View>
              <Text style={styles.tokenCount}>{tokenCount}</Text>
            </View>
          </View>

          <Pressable
            style={styles.customButton}
            onPress={() =>
              openAdBridge(t("addCreateCustomHabit"), "/add/custom")
            }
          >
            <View style={styles.customCopy}>
              <Text style={[commonStyles.titleLg, styles.customTitle]}>
                {t("addCreateCustomHabit")}
              </Text>
            </View>

            <View style={styles.customPlusWrap}>
              <Text style={styles.customPlus}>+</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[commonStyles.eyebrow, styles.eyebrow]}>
            {t("addPopularHabits")}
          </Text>

          <View style={styles.grid}>
            {popularHabits.map((habit) => {
              const colors = getHabitAccent(habit.accent);

              return (
                <Pressable
                  key={habit.name}
                  style={[styles.card, { backgroundColor: colors.card }]}
                  onPress={() =>
                    openAdBridge(
                      t("addActionAddHabit", { habit: habit.name }),
                      "/add/custom"
                    )
                  }
                >
                  <View
                    style={[styles.badgeWrap, { backgroundColor: colors.badge }]}
                  >
                    <Text style={styles.badgeText}>{habit.icon}</Text>
                  </View>

                  <Text style={[styles.cardName, { color: colors.text }]}>
                    {habit.name}
                  </Text>

                  <Text style={styles.cardDetail}>{habit.detail}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[commonStyles.eyebrow, styles.eyebrow]}>
            {t("addCurrentHabits")}
          </Text>

          <View style={styles.currentHabitStack}>
            {habits.map((habit) => {
              const colors = getHabitAccent(habit.color);

              return (
                <View
                  key={habit.id}
                  style={[commonStyles.cardCompact, styles.currentHabitCard]}
                >
                  <View
                    style={[
                      styles.currentHabitBadge,
                      { backgroundColor: colors.badge },
                    ]}
                  >
                    <Text style={styles.currentHabitIcon}>{habit.icon}</Text>
                  </View>

                  <View style={styles.currentHabitCopy}>
                    <Text style={styles.currentHabitName}>{habit.name}</Text>
                    <Text style={styles.currentHabitDetail}>
                      {habit.current}/{habit.goal} {habit.unit}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.currentHabitEditButton}
                    onPress={() => openEditHabit(habit.id)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name="pencil"
                      size={16}
                      color={AppTheme.colors.textSubtle}
                    />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
