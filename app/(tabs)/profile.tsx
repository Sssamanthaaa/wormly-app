import { View, Text, Pressable, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { AppTheme } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { useUserData } from "@/store/user-data";
import { commonStyles } from "@/styles/common";
import { profileStyles as styles } from "@/styles/screens/profile";

export default function ProfileScreen() {
  const { t } = useAppTranslation();
  const {
    profile,
    setProfileLanguage,
    setAvatarMode,
    setProfileName,
    setWormFilterId,
    profileAccountUnlocked,
  } = useUserData();
  const [draftName, setDraftName] = useState(profile.name);
  const [draftLanguage, setDraftLanguage] = useState(profile.language);

  useEffect(() => {
    setDraftName(profile.name);
    setDraftLanguage(profile.language);
  }, [profile.name, profile.language]);

  const wormFilterPresets = [
    {
      id: "classic",
      label: t("profileFilterClassic"),
      color: AppTheme.colors.teaGreen,
    },
    {
      id: "sunset",
      label: t("profileFilterSunset"),
      color: AppTheme.colors.peachFrost,
    },
    {
      id: "berry",
      label: t("profileFilterBerry"),
      color: AppTheme.colors.grapeJuice,
    },
    { id: "sky", label: t("profileFilterSky"), color: AppTheme.colors.icedBlue },
    {
      id: "gold",
      label: t("profileFilterGold"),
      color: AppTheme.colors.butterYellow,
    },
  ] as const;
  const languageOptions = [
    { value: "English", label: t("profileLanguageEnglish") },
    { value: "Spanish", label: t("profileLanguageSpanish") },
    { value: "French", label: t("profileLanguageFrench") },
  ] as const;
  const hasPendingChanges =
    profileAccountUnlocked &&
    (draftName.trim() !== profile.name || draftLanguage !== profile.language);

  const activePreset =
    wormFilterPresets.find((preset) => preset.id === profile.wormFilterId) ||
    wormFilterPresets[0];

  function applyProfileChanges() {
    if (!profileAccountUnlocked) return;

    const name = draftName.trim() || t("profileDefaultUser");

    setProfileName(name);
    setProfileLanguage(draftLanguage);
  }

  function openAccountUnlockAdBridge() {
    if (profileAccountUnlocked) return;

    router.push({
      pathname: "/add/adbridge",
      params: {
        buttonPressed: t("profileUnlockAccount"),
        redirectPage: "/profile",
        unlockTarget: "profile-account",
      },
    });
  }

  return (
    <View style={[commonStyles.page, styles.page]}>
      <View style={commonStyles.card}>
        <View style={styles.hero}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: activePreset.color },
            ]}
          >
            <Image source={AppTheme.assets.worm} style={styles.avatarImage} />
          </View>

          <View>
            <Text style={commonStyles.eyebrow}>{t("profileTitle")}</Text>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>
      </View>

      <View style={commonStyles.card}>
        <View style={styles.accountHeader}>
          <Text style={commonStyles.sectionTitle}>
            {t("profileAccountDetails")}
          </Text>

          <Pressable
            style={[
              styles.lockButton,
              profileAccountUnlocked && styles.lockButtonUnlocked,
            ]}
            onPress={openAccountUnlockAdBridge}
            disabled={profileAccountUnlocked}
            hitSlop={10}
          >
            <Ionicons
              name={profileAccountUnlocked ? "lock-open" : "lock-closed"}
              size={18}
              color={
                profileAccountUnlocked
                  ? AppTheme.colors.white
                  : AppTheme.colors.text
              }
            />
          </Pressable>
        </View>

        {!profileAccountUnlocked && (
          <Text style={styles.lockedHint}>{t("profileLockedHint")}</Text>
        )}

        <Text style={styles.label}>{t("profileDisplayName")}</Text>
        <TextInput
          value={draftName}
          onChangeText={setDraftName}
          style={[styles.input, !profileAccountUnlocked && styles.inputLocked]}
          editable={profileAccountUnlocked}
        />

        <Text style={styles.label}>{t("profileEmail")}</Text>
        <View style={styles.readonly}>
          <Text>{profile.email}</Text>
        </View>

        <Text style={styles.label}>{t("profileLanguage")}</Text>
        <View style={styles.languageRow}>
          {languageOptions.map((language) => {
            const isSelected = draftLanguage === language.value;

            return (
              <Pressable
                key={language.value}
                style={[
                  styles.languageChip,
                  isSelected && styles.languageChipActive,
                  !profileAccountUnlocked && styles.languageChipLocked,
                ]}
                onPress={() => setDraftLanguage(language.value)}
                disabled={!profileAccountUnlocked}
              >
                <Text
                  style={[
                    styles.languageChipText,
                    isSelected && styles.languageChipTextActive,
                    !profileAccountUnlocked && styles.languageChipTextLocked,
                  ]}
                >
                  {language.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[
            styles.applyButton,
            !hasPendingChanges && styles.applyButtonDisabled,
          ]}
          onPress={applyProfileChanges}
          disabled={!hasPendingChanges}
        >
          <Text style={styles.applyButtonText}>{t("profileApplyChanges")}</Text>
        </Pressable>
      </View>

      <View style={commonStyles.card}>
        <Text style={commonStyles.sectionTitle}>{t("profilePicture")}</Text>

        <View style={styles.actions}>
          <Pressable style={commonStyles.primaryButton}>
            <Text style={commonStyles.primaryButtonText}>
              {t("profileUploadImage")}
            </Text>
          </Pressable>

          <Pressable
            style={commonStyles.secondaryButton}
            onPress={() => setAvatarMode("worm")}
          >
            <Text>{t("profileUseWorm")}</Text>
          </Pressable>
        </View>

        <Text style={styles.helper}>{t("profilePickColor")}</Text>

        <View style={styles.filterGrid}>
          {wormFilterPresets.map((preset) => {
            const isActive = profile.wormFilterId === preset.id;

            return (
              <Pressable
                key={preset.id}
                style={[styles.filterCard, isActive && styles.filterActive]}
                onPress={() => {
                  setWormFilterId(preset.id);
                  setAvatarMode("worm");
                }}
              >
                <View
                  style={[
                    styles.filterPreview,
                    { backgroundColor: preset.color },
                  ]}
                >
                  <Image source={AppTheme.assets.worm} style={styles.filterImage} />
                </View>

                <Text style={styles.filterText}>{preset.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
