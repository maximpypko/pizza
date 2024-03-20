import React, { useState, memo, useContext } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonWrapper from "./ButtonWrapper";
import { ThemeContext } from "../core/theme";

const ItemPizza = ({ item, onPressItemPizza, disabledItemPizza }) => {
  const { title, isNew, image, id, photos } = item;
  const [isFavorites, setIsFavorites] = useState(item.isFavorites);

  const themeValue = useContext(ThemeContext);

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
      android_ripple={[styles.ripple, { color: themeValue.theme.rippleColor }]}
      style={[
        styles.container,
        {
          backgroundColor: themeValue.theme.itemPizzaBgColor,
          borderColor: themeValue.theme.mainBorderColor,
          shadowColor: themeValue.theme.shadowColor,
        },
        styles.ripple,
      ]}
    >
      <View style={styles.itemImage}>
        <Image
          style={styles.headerImage}
          source={{
            uri: image,
          }}
        />
        {isNew && (
          <Text
            style={[
              styles.mark,
              {
                backgroundColor: themeValue.theme.mainBgColor,
                borderColor: themeValue.theme.mainBorderColor,
                color: themeValue.theme.fontColor,
              },
            ]}
          >
            New
          </Text>
        )}
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeValue.theme.fontColor }]}>
            {title}
          </Text>
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
          {isNew && (
            <Text
              style={[styles.newPrices, { color: themeValue.theme.fontColor }]}
            >
              New Price
            </Text>
          )}
          <Text
            style={[
              isNew && styles.oldPrices,
              { color: themeValue.theme.fontColor },
            ]}
          >
            Old Price
          </Text>
        </View>
        <View style={styles.footer}>
          <Text
            style={[styles.description, { color: themeValue.theme.fontColor }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Juicy pizza with thin crispy crust, generously topped with fresh
            ingredients.
          </Text>
          <ButtonWrapper onPress={onPressButtonBuy} style={styles.buttonBuy}>
            <Text
              style={[
                styles.description,
                { color: themeValue.theme.fontColor },
              ]}
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
      </View>
    </Pressable>
  );
};

export default memo(ItemPizza);

const styles = StyleSheet.create({
  ripple: {
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
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
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
    borderWidth: 1,
    borderStyle: "solid",
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
    alignItems: "center",
    gap: 10,
  },
  description: {
    flexShrink: 1,
  },
  buttonBuy: {
    padding: 5,
    flexDirection: "row",
    gap: 5,
  },
});
