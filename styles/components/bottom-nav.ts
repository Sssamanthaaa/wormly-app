import { StyleSheet } from "react-native";
import { AppTheme } from "@/constants/theme";

export const bottomNavStyles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: AppTheme.colors.page,
  },
  shell: {
    width: "88%",
    height: 88,
    backgroundColor: "#11181C",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#11181C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 18,
  },
  item: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  centerItem: {
    marginTop: -2,
  },
  wormIcon: {
    width: 54,
    height: 54,
  },
});
