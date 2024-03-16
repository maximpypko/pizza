import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { widthSlider } from "../../utils/widthSlider";
import ButtonWrapper from "../../components/ButtonWrapper";
import Slide from "../../components/Slide";
import SliderItemIndicator from "../../components/SliderItemIndicator";
import { ThemeContext } from "../../core/theme";

const DescriptionPizzaScreen = ({ route }) => {
  const {
    item: { title, photos, description },
  } = route.params;

  const themeValue = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeValue.theme.mainBgColor },
      ]}
    >
      <Text style={[styles.title, { color: themeValue.theme.fontColor }]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[styles.description, { color: themeValue.theme.fontColor }]}
        >
          {description}
        </Text>
      ) : (
        <Text style={styles.description}>No description</Text>
      )}
    </View>
  );
};

export default DescriptionPizzaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
});
