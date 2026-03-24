import { Pressable, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppTheme } from "@/constants/theme";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { bottomNavStyles as styles } from "@/styles/components/bottom-nav";

export default function BottomNav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useAppTranslation();
  const routeLabels = {
    index: t("tabHome"),
    calendar: t("tabCalendar"),
    add: t("tabAdd"),
    progress: t("tabProgress"),
    profile: t("tabProfile"),
  } as const;

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View style={styles.shell}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            routeLabels[route.name as keyof typeof routeLabels] ??
            (typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
                ? options.title
                : route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const iconColor = isFocused ? AppTheme.colors.white : "#B3B8BF";

          let icon;

          if (route.name === "index") {
            icon = (
              <Ionicons
                name={isFocused ? "home" : "home-outline"}
                size={28}
                color={iconColor}
              />
            );
          } else if (route.name === "calendar") {
            icon = (
              <Ionicons
                name={isFocused ? "calendar" : "calendar-outline"}
                size={28}
                color={iconColor}
              />
            );
          } else if (route.name === "add") {
            icon = (
              <Image
                source={AppTheme.assets.worm}
                style={styles.wormIcon}
                contentFit="contain"
              />
            );
          } else if (route.name === "progress") {
            icon = (
              <Ionicons
                name={isFocused ? "stats-chart" : "stats-chart-outline"}
                size={28}
                color={iconColor}
              />
            );
          } else {
            icon = (
              <Ionicons
                name={isFocused ? "person" : "person-outline"}
                size={28}
                color={iconColor}
              />
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              testID={options.tabBarButtonTestID}
              style={[
                styles.item,
                route.name === "add" && styles.centerItem,
              ]}
            >
              {icon}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

