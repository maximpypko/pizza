import { Text, FlatList, View, StyleSheet } from "react-native";
import basketStore from "./BasketStore";
import ItemPizza from "../../components/ItemPizza";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonWrapper from "../../components/ButtonWrapper";
import { useContext } from "react";
import { ThemeContext } from "../../core/theme";

const BasketItem = ({ item }) => {
  const { title, price, amount } = item;
  const themeValue = useContext(ThemeContext);

  const onPressButtonDelete = () => {
    basketStore.setOrders("delete", item);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{title}</Text>
      <Text style={styles.itemPrice}>{price}</Text>
      <Text style={styles.itemAmount}>{amount}</Text>
      <Text style={styles.itemSum}>{price * amount}</Text>
      <ButtonWrapper onPress={onPressButtonDelete} style={styles.buttonDelete}>
        <MaterialIcons
          name="delete"
          size={24}
          color={themeValue.theme.iconsColor}
        />
      </ButtonWrapper>
    </View>
  );
};

export default BasketItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 7,
  },
  itemName: {
    flex: 1,
    fontSize: 17,
  },
  buttonDelete: {
    padding: 3,
  },
  itemPrice: {
    flexBasis: 60,
  },
  itemAmount: {
    flexBasis: 50,
  },
  itemSum: {
    flexBasis: 20,
    fontWeight: "900",
  },
});
