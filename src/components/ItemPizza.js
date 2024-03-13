import React, { useState, memo } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import ButtonWrapper from "./ButtonWrapper";

const ItemPizza = ({ item, onPressItemPizza, disabledItemPizza }) => {
  const { title, isNew, image, id, photos } = item;
  const [isFavorites, setIsFavorites] = useState(item.isFavorites);

  onPressButtonHeart = () => {
    setIsFavorites(!isFavorites);
  };

  onPressButtonBuy = () => {
    console.warn("You have added an item to your cart");
  };

  return (
    <Pressable
      onPress={() => onPressItemPizza(item)}
      disabled={disabledItemPizza}
      android_ripple={styles.ripple}
      style={styles.container}
      style={() => [styles.container, styles.ripple]}
    >
      <View style={styles.itemImage}>
        <Image
          style={styles.headerImage}
          source={{
            uri: image,
          }}
        />
        {isNew && <Text style={styles.mark}>New</Text>}
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <ButtonWrapper
            onPress={onPressButtonHeart}
            isCustomStyle={false}
            isRipple={false}
          >
            <AntDesign
              name={isFavorites ? "heart" : "hearto"}
              size={22}
              color="red"
            />
          </ButtonWrapper>
        </View>
        <View style={styles.prices}>
          {isNew && <Text style={styles.newPrices}>New Price</Text>}
          <Text style={isNew && styles.oldPrices}>Old Price</Text>
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Juicy pizza with thin crispy crust, generously topped with fresh
            ingredients.
          </Text>
          <ButtonWrapper onPress={onPressButtonBuy} style={styles.buttonBuy}>
            <Text style={styles.description}>Buy</Text>
            <MaterialCommunityIcons
              name="cart-variant"
              size={24}
              color="black"
            />
          </ButtonWrapper>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ItemPizza);

const styles = StyleSheet.create({
  ripple: {
    color: colors.rippleColor,
    borderless: false,
  },
  container: {
    width: "calc(100% - 20px)",
    padding: 12,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    gap: 15,
    backgroundColor: colors.itemPizzaBgColor,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.mainBorderColor,
    borderRadius: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    position: "relative",
  },
  mark: {
    position: "absolute",
    right: -13,
    top: -10,
    zIndex: 2,
    paddingTop: 3,
    paddingRight: 5,
    paddingBottom: 3,
    paddingLeft: 5,
    backgroundColor: colors.mainBgColor,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.mainBorderColor,
    borderRadius: 15,
    fontSize: 11,
    overflow: "hidden",
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  info: {
    flexShrink: 1,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 17,
  },
  favoritesContainer: {
    width: 45,
    height: 45,
  },
  prices: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  newPrices: {
    fontSize: 20,
    fontWeight: "900",
  },
  oldPrices: {
    textDecorationLine: "line-through",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-center",
    gap: 10,
  },
  description: {
    flexShrink: 1,
  },
  buttonBuy: {
    flexDirection: "row",
    gap: 5,
  },
});
