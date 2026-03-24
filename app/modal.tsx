import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAppTranslation } from "@/hooks/use-app-translation";
import { commonStyles } from "@/styles/common";
import { modalStyles as styles } from "@/styles/screens/modal";

export default function ModalScreen() {
  const { t } = useAppTranslation();

  return (
    <View style={styles.container}>
      <View style={[commonStyles.card, styles.card]}>
        <Text style={commonStyles.titleLg}>{t("modalTitle")}</Text>
        <Text style={styles.copy}>{t("modalCopy")}</Text>
      </View>

      <Link href="/" dismissTo style={styles.link}>
        <Text style={styles.linkText}>{t("modalGoHome")}</Text>
      </Link>
    </View>
  );
}
