function clampColorValue(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clampColorValue(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(base: string, target: string, amount: number) {
  const baseRgb = hexToRgb(base);
  const targetRgb = hexToRgb(target);

  return rgbToHex(
    baseRgb.r + (targetRgb.r - baseRgb.r) * amount,
    baseRgb.g + (targetRgb.g - baseRgb.g) * amount,
    baseRgb.b + (targetRgb.b - baseRgb.b) * amount
  );
}

function getRelativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const value = channel / 255;

    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export const habitPalette = {
  teaGreen: "#AACC96",
  forest: "#25533F",
  peachFrost: "#F4BEAE",
  blueBerry: "#52A5CE",
  bubblegum: "#FF7BAC",
  dryEarth: "#876029",
  grapeJuice: "#6D1F42",
  lilacs: "#D3B6D3",
  butterYellow: "#EFCE7B",
  icedBlue: "#B8CEE8",
  bloodOrange: "#EF6F3C",
  oliveGreen: "#AFAB23",
} as const;

export type HabitColor = keyof typeof habitPalette;

const legacyHabitColorMap = {
  blush: "bubblegum",
  violet: "lilacs",
  lilac: "lilacs",
  coral: "teaGreen",
  mint: "teaGreen",
} as const;

function resolveHabitColor(color: string): HabitColor {
  if (color in habitPalette) {
    return color as HabitColor;
  }

  if (color in legacyHabitColorMap) {
    return legacyHabitColorMap[color as keyof typeof legacyHabitColorMap];
  }

  return "teaGreen";
}

export const AppTheme = {
  colors: {
    page: "#F8F7F4",
    surface: "#FFFFFF",
    surfaceMuted: "#F3F1EC",
    surfaceAlt: "#F0EFEA",
    border: "#E3E2DD",
    borderSoft: "#D9D9DE",
    text: "#1D1D1D",
    textStrong: "#11181C",
    textMuted: "#7A7A7A",
    textSubtle: "#6E6E6E",
    textLight: "#555555",
    white: "#FFFFFF",
    black: "#000000",
    primary: habitPalette.forest,
    primarySoft: habitPalette.teaGreen,
    primarySoftAlt: habitPalette.icedBlue,
    primaryBorder: habitPalette.oliveGreen,
    success: habitPalette.forest,
    successSoft: mixHex(habitPalette.teaGreen, "#FFFFFF", 0.36),
    successBorder: mixHex(habitPalette.oliveGreen, "#FFFFFF", 0.12),
    successText: habitPalette.forest,
    successTextMuted: mixHex(habitPalette.forest, "#FFFFFF", 0.22),
    successTint: habitPalette.oliveGreen,
    disabled: "#B9B9B9",
    disabledSoft: "#D9E3D6",
    disabledBorder: "#C5CEC2",
    disabledText: "#879284",
    tokenBg: mixHex(habitPalette.butterYellow, "#FFFFFF", 0.26),
    tokenFill: habitPalette.butterYellow,
    tokenBorder: mixHex(habitPalette.dryEarth, habitPalette.butterYellow, 0.6),
    tokenText: habitPalette.dryEarth,
    previewCard: "#FFE4E1",
    previewFill: "#FF7F7F",
    previewAccent: "#FF9A8B",
    gray100: "#F3F3F3",
    gray200: "#EEEEEE",
    gray300: "#CFCFCF",
    gray350: "#C5CEC2",
    gray400: "#B8B8B8",
    ...habitPalette,
  },
  spacing: {
    pageTop: 70,
    pageHorizontal: 20,
    tabBottom: 140,
    card: 20,
    cardCompact: 16,
    section: 28,
    gapXs: 4,
    gapSm: 8,
    gapMd: 10,
    gapLg: 12,
    gapXl: 16,
  },
  radii: {
    pill: 999,
    card: 24,
    cardMd: 20,
    control: 16,
    input: 14,
    circle: 999,
  },
  typography: {
    eyebrow: 13,
    label: 13,
    body: 15,
    titleSm: 16,
    titleMd: 18,
    titleLg: 20,
    titleXl: 26,
    titleHero: 34,
  },
  fonts: {
    regular: "Manrope_400Regular",
    medium: "Manrope_500Medium",
    semibold: "Manrope_600SemiBold",
    bold: "Manrope_700Bold",
  },
  weights: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  emojis: {
    token: "\u{1FA99}",
    water: "\u{1F4A7}",
    walk: "\u{1F6B6}",
    swim: "\u{1F3CA}",
    stretch: "\u{1F9D8}",
    book: "\u{1F4DA}",
    salad: "\u{1F957}",
    sleep: "\u{1F634}",
    run: "\u{1F3C3}",
    mind: "\u{1F9E0}",
    emptyCircle: "\u{25CC}",
  },
  assets: {
    worm: require("../assets/images/worm.svg"),
  },
  habitPalette,
  wormMoodColors: {
    empty: {
      body: "#CFCFCF",
      belly: "#E9E9E9",
      accent: "#B8B8B8",
    },
    low: {
      body: "#E6A8B8",
      belly: "#F6CAD4",
      accent: "#E6A8B8",
    },
    medium: {
      body: "#B7A6F6",
      belly: "#DDD0FF",
      accent: "#B7A6F6",
    },
    high: {
      body: "#69BE7F",
      belly: "#94CCA3",
      accent: "#69BE7F",
    },
  },
} as const;

export function getHabitAccent(color: string) {
  const resolvedColor = resolveHabitColor(color);
  const base = habitPalette[resolvedColor];
  const isDark = getRelativeLuminance(base) < 0.2;

  return {
    base,
    card: isDark ? mixHex(base, "#FFFFFF", 0.22) : mixHex(base, "#FFFFFF", 0.74),
    fill: isDark ? mixHex(base, "#FFFFFF", 0.34) : mixHex(base, "#FFFFFF", 0.56),
    progress: isDark ? mixHex(base, "#FFFFFF", 0.24) : mixHex(base, "#FFFFFF", 0.08),
    button: isDark ? mixHex(base, "#FFFFFF", 0.1) : mixHex(base, "#000000", 0.08),
    badge: isDark ? mixHex(base, "#FFFFFF", 0.14) : mixHex(base, "#FFFFFF", 0.1),
    text: isDark ? "#FFF8F1" : mixHex(base, "#1D1D1D", 0.64),
  };
}
