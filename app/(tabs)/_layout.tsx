import { Tabs } from "expo-router";
import BottomNav from "../../components/BottomNav";
import { useAppTranslation } from "@/hooks/use-app-translation";

export default function TabsLayout() {
  const { t } = useAppTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: t("tabHome") }} />
      <Tabs.Screen name="calendar" options={{ title: t("tabCalendar") }} />
      <Tabs.Screen name="add" options={{ title: t("tabAdd") }} />
      <Tabs.Screen name="progress" options={{ title: t("tabProgress") }} />
      <Tabs.Screen name="profile" options={{ title: t("tabProfile") }} />
    </Tabs>
  );
}
