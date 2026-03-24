export type WormMoodLevel = "low" | "medium" | "high";

export type CalendarHabitEntry = {
  date: string;
  mood: WormMoodLevel;
  completedHabits: number;
  totalHabits: number;
};

const recentCompletionCounts = [
  3, 3, 3, 2, 1, 3, 2,
];

function getMoodFromCompletion(
  completedHabits: number,
  totalHabits: number
): WormMoodLevel {
  if (completedHabits >= totalHabits) return "high";
  if (completedHabits > 1) return "medium";
  return "low";
}

export function formatCalendarDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const recentCalendarEntries: CalendarHabitEntry[] =
  recentCompletionCounts.map((completedHabits, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    const totalHabits = 3;

    return {
      date: formatCalendarDateKey(date),
      mood: getMoodFromCompletion(completedHabits, totalHabits),
      completedHabits,
      totalHabits,
    };
  });

export const calendarEntriesByDate = recentCalendarEntries.reduce<
  Record<string, CalendarHabitEntry>
>((entries, entry) => {
  entries[entry.date] = entry;
  return entries;
}, {});
