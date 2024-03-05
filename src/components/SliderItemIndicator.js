import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../utils/colors";

const SliderItemIndicator = ({ isActive }) => {
  return <View style={[styles.indicator, isActive && styles.isActive]} />;
};

export default SliderItemIndicator;

const styles = StyleSheet.create({
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.buttonBgColor,
  },
  isActive: {
    backgroundColor: colors.iconsColor,
  },
});
