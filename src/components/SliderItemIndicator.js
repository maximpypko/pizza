import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../core/theme";

const SliderItemIndicator = ({ isActive }) => {
  const themeValue = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: themeValue.theme.buttonBgColor },
        isActive && { backgroundColor: themeValue.theme.iconsColor },
      ]}
    />
  );
};

export default SliderItemIndicator;

const styles = StyleSheet.create({
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
