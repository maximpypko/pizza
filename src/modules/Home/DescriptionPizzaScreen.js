import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { observer } from "mobx-react";
import { widthSlider } from "../../utils/widthSlider";
import ButtonWrapper from "../../components/ButtonWrapper";
import Slide from "../../components/Slide";
import SliderItemIndicator from "../../components/SliderItemIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../core/theme";
import basketStore from "../Basket/BasketStore";

const DescriptionPizzaScreen = ({ route }) => {
  const { item } = route.params;
  const { title, photos, description } = item;

  const themeValue = useContext(ThemeContext);

  onPressButtonBuy = () => {
    basketStore.setOrders("add", item);
  };

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
      <ButtonWrapper onPress={onPressButtonBuy} style={styles.buttonBuy}>
        <Text
          style={[styles.description, { color: themeValue.theme.fontColor }]}
        >
          Buy
        </Text>
        <MaterialCommunityIcons
          name="cart-variant"
          size={24}
          color={themeValue.theme.iconsColor}
        />
      </ButtonWrapper>
    </View>
  );
};

export default observer(DescriptionPizzaScreen);

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
  buttonBuy: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingBottom: 0,
  },
});
