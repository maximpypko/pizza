import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../utils/colors";
import { widthSlider } from "../../utils/widthSlider";
import ButtonWrapper from "../../components/ButtonWrapper";
import Slide from "../../components/Slide";
import SliderItemIndicator from "../../components/SliderItemIndicator";

const DescriptionPizzaScreen = ({ route }) => {
  const {
    item: { title, photos, description },
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
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
    backgroundColor: colors.mainBgColor,
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
