import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { AppTheme } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { customHabitStyles as styles } from "@/styles/screens/custom-habit";

const emojiOptions = [
  AppTheme.emojis.water,
  AppTheme.emojis.walk,
  AppTheme.emojis.swim,
  AppTheme.emojis.stretch,
  AppTheme.emojis.book,
  AppTheme.emojis.salad,
  AppTheme.emojis.sleep,
  AppTheme.emojis.run,
  AppTheme.emojis.mind,
];

export default function CustomHabitScreen() {
  const { t } = useAppTranslation();
  const { habitId } = useLocalSearchParams<{
    habitId?: string;
  }>();
  const { habits, addHabit, updateHabit } = useUserData();
  const habitToEdit = habitId
    ? habits.find((habit) => habit.id === String(habitId))
    : undefined;
  const isEditing = Boolean(habitToEdit);

  const [name, setName] = useState(habitToEdit?.name ?? t("customDefaultName"));
  const [goal, setGoal] = useState(String(habitToEdit?.goal ?? 10));
  const [unit, setUnit] = useState(habitToEdit?.unit ?? t("customDefaultUnit"));
  const [note, setNote] = useState(
    habitToEdit?.note ?? t("customDefaultNote")
  );
  const [icon, setIcon] = useState(habitToEdit?.icon ?? "");

  const percent = isEditing
    ? Math.min(
        100,
        Math.round(
          (((habitToEdit?.current ?? 0) / Math.max(Number(goal) || 1, 1)) * 100)
        )
      )
    : 32;
  const previewCurrent = isEditing
    ? Math.min(habitToEdit?.current ?? 0, Math.max(Number(goal) || 1, 1))
    : Math.round(Number(goal) * 0.32);
  const isSaveDisabled = icon.length === 0;

  function handleSaveHabit() {
    if (isSaveDisabled) return;

    const habitInput = {
      name,
      goal: Math.max(Number(goal) || 1, 1),
      unit,
      icon,
      note,
    };

    if (habitToEdit) {
      updateHabit(habitToEdit.id, habitInput);
    } else {
      addHabit(habitInput);
    }

    router.back();
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={commonStyles.scrollPage}
        contentContainerStyle={styles.content}
      >
        <View style={styles.closeButtonRow}>
          <Pressable
            style={styles.closeButton}
            onPress={() => router.back()}
            hitSlop={10}
          >
            <Ionicons
              name="close"
              size={20}
              color={AppTheme.colors.successText}
            />
          </Pressable>
        </View>

        <Text style={commonStyles.eyebrow}>
          {isEditing ? t("customEditHabit") : t("customHabit")}
        </Text>
        <Text style={[commonStyles.titleXl, styles.headerTitle]}>
          {isEditing ? t("customUpdateHabit") : t("customCreateHabit")}
        </Text>

        <View style={commonStyles.cardCompact}>
          <Text style={commonStyles.sectionTitle}>{t("customHabitDetails")}</Text>

          <Text style={styles.label}>{t("customHabitName")}</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>{t("customChooseIcon")}</Text>
          <View style={styles.emojiGrid}>
            {emojiOptions.map((emoji) => {
              const isSelected = icon === emoji;

              return (
                <Pressable
                  key={emoji}
                  style={[
                    styles.emojiOption,
                    isSelected && styles.emojiOptionSelected,
                  ]}
                  onPress={() => setIcon(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </Pressable>
              );
            })}
          </View>
          {!icon && (
            <Text style={styles.helperText}>{t("customSelectEmoji")}</Text>
          )}

          <View style={styles.row}>
            <View style={styles.flexField}>
              <Text style={styles.label}>{t("customGoal")}</Text>
              <TextInput
                style={styles.input}
                value={goal}
                onChangeText={setGoal}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.flexField}>
              <Text style={styles.label}>{t("customUnit")}</Text>
              <TextInput
                style={styles.input}
                value={unit}
                onChangeText={setUnit}
              />
            </View>
          </View>

          <Text style={styles.label}>{t("customWhyItMatters")}</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>

        <View style={commonStyles.cardCompact}>
          <Text style={commonStyles.sectionTitle}>{t("customPreview")}</Text>

          <View style={styles.previewCard}>
            <Text style={styles.previewIcon}>
              {icon || AppTheme.emojis.emptyCircle}
            </Text>
            <Text style={styles.previewTitle}>{name}</Text>
            <Text style={styles.previewSub}>
              {previewCurrent}/{goal} {unit}
            </Text>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>

            <Text style={styles.percent}>{percent}%</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isSaveDisabled && styles.buttonDisabled]}
          onPress={handleSaveHabit}
          disabled={isSaveDisabled}
        >
          <Text style={styles.buttonText}>
            {isEditing ? t("customSaveChanges") : t("customSaveHabit")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
