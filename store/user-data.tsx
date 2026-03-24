import { habitPalette } from "@/constants/theme";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { initialHabits, type Habit } from "@/constants/habits";
import {
  calendarEntriesByDate as initialCalendarEntriesByDate,
  type CalendarHabitEntry,
} from "@/constants/calendar-data";
import type { AppLanguage } from "@/constants/translations";

export type UserProfile = {
  name: string;
  email: string;
  language: AppLanguage;
  avatarMode: "worm" | "image";
  wormFilterId: string;
};

type AddHabitInput = {
  name: string;
  goal: number;
  unit: string;
  icon: string;
  note?: string;
};

type UserDataContextValue = {
  profile: UserProfile;
  habits: Habit[];
  tokenCount: number;
  progressInsightsUnlocked: boolean;
  profileAccountUnlocked: boolean;
  calendarEntriesByDate: Record<string, CalendarHabitEntry>;
  setProfileName: (name: string) => void;
  setProfileLanguage: (language: UserProfile["language"]) => void;
  setAvatarMode: (avatarMode: UserProfile["avatarMode"]) => void;
  setWormFilterId: (wormFilterId: string) => void;
  addHabit: (habit: AddHabitInput) => void;
  updateHabit: (habitId: string, habit: AddHabitInput) => void;
  unlockProgressInsights: () => void;
  unlockProfileAccount: () => void;
  incrementHabit: (habitId: string) => void;
  awardToken: (amount?: number) => void;
  redeemToken: () => boolean;
};

const initialProfile: UserProfile = {
  name: "Sammi",
  email: "sammi@wormly.app",
  language: "English",
  avatarMode: "worm",
  wormFilterId: "classic",
};

const habitColors = Object.keys(habitPalette) as Habit["color"][];

const UserDataContext = createContext<UserDataContextValue | null>(null);

export function UserDataProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState(initialProfile);
  const [habits, setHabits] = useState(initialHabits);
  const [tokenCount, setTokenCount] = useState(3);
  const [progressInsightsUnlocked, setProgressInsightsUnlocked] = useState(false);
  const [profileAccountUnlocked, setProfileAccountUnlocked] = useState(false);
  const [calendarEntriesByDate] = useState(initialCalendarEntriesByDate);

  function setProfileName(name: string) {
    setProfile((currentProfile) => ({ ...currentProfile, name }));
  }

  function setProfileLanguage(language: UserProfile["language"]) {
    setProfile((currentProfile) => ({ ...currentProfile, language }));
  }

  function setAvatarMode(avatarMode: UserProfile["avatarMode"]) {
    setProfile((currentProfile) => ({ ...currentProfile, avatarMode }));
  }

  function setWormFilterId(wormFilterId: string) {
    setProfile((currentProfile) => ({ ...currentProfile, wormFilterId }));
  }

  function addHabit({ name, goal, unit, icon, note }: AddHabitInput) {
    const trimmedName = name.trim();
    const habitName = trimmedName || "New habit";

    setHabits((currentHabits) => [
      ...currentHabits,
      {
        id:
          trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
          `habit-${currentHabits.length + 1}`,
        name: habitName,
        current: 0,
        goal,
        unit,
        step: 1,
        icon,
        color: habitColors[currentHabits.length % habitColors.length],
        note,
      },
    ]);
  }

  function updateHabit(
    habitId: string,
    { name, goal, unit, icon, note }: AddHabitInput
  ) {
    const trimmedName = name.trim();
    const habitName = trimmedName || "New habit";
    const normalizedGoal = Math.max(goal || 1, 1);

    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              name: habitName,
              goal: normalizedGoal,
              unit,
              icon,
              note,
              current: Math.min(habit.current, normalizedGoal),
            }
          : habit
      )
    );
  }

  function incrementHabit(habitId: string) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              current: Math.min(habit.current + habit.step, habit.goal),
            }
          : habit
      )
    );
  }

  function unlockProgressInsights() {
    setProgressInsightsUnlocked(true);
  }

  function unlockProfileAccount() {
    setProfileAccountUnlocked(true);
  }

  function awardToken(amount = 1) {
    setTokenCount((currentCount) => currentCount + amount);
  }

  function redeemToken() {
    let wasRedeemed = false;

    setTokenCount((currentCount) => {
      if (currentCount <= 0) return currentCount;

      wasRedeemed = true;
      return currentCount - 1;
    });

    return wasRedeemed;
  }

  return (
    <UserDataContext.Provider
      value={{
        profile,
        habits,
        tokenCount,
        progressInsightsUnlocked,
        profileAccountUnlocked,
        calendarEntriesByDate,
        setProfileName,
        setProfileLanguage,
        setAvatarMode,
        setWormFilterId,
        addHabit,
        updateHabit,
        unlockProgressInsights,
        unlockProfileAccount,
        incrementHabit,
        awardToken,
        redeemToken,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
}
