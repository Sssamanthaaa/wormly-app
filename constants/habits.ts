import { AppTheme, type HabitColor } from "@/constants/theme";

export type Habit = {
  id: string;
  name: string;
  current: number;
  goal: number;
  unit: string;
  step: number;
  icon: string;
  color: HabitColor;
  note?: string;
};

export const initialHabits: Habit[] = [
  {
    id: "water",
    name: "Drink water",
    current: 2,
    goal: 8,
    unit: "cups",
    step: 1,
    icon: AppTheme.emojis.water,
    color: "teaGreen",
  },
  {
    id: "walk",
    name: "Walk the loop",
    current: 2,
    goal: 5,
    unit: "laps",
    step: 1,
    icon: AppTheme.emojis.walk,
    color: "blueBerry",
  },
  {
    id: "stretch",
    name: "Stretch break",
    current: 1,
    goal: 3,
    unit: "sessions",
    step: 1,
    icon: AppTheme.emojis.stretch,
    color: "peachFrost",
  },
];
