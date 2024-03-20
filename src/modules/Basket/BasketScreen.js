import { Text, FlatList, View, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import basketStore from "./BasketStore";
import ItemPizza from "../../components/ItemPizza";
import BasketItem from "./BasketItem";
import { useContext } from "react";
import { ThemeContext } from "../../core/theme";
import ButtonWrapper from "../../components/ButtonWrapper";

const BasketScreen = () => {
  const { orders, getTotalPrice } = basketStore ?? {};
  const themeValue = useContext(ThemeContext);

  const onPressButtonCheckout = () => {
    basketStore.resetOrders();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeValue.theme.mainBgColor },
      ]}
    >
      {orders?.length > 0 ? (
        <>
          <View
            style={[styles.header, { borderColor: themeValue.theme.fontColor }]}
          >
            <Text
              style={[
                styles.headerText,
                styles.headerTextName,
                {
                  color: themeValue.theme.fontColor,
                  //
                },
              ]}
            >
              NAME
            </Text>
            <Text
              style={[styles.headerText, { color: themeValue.theme.fontColor }]}
            >
              PRICE, $
            </Text>
            <Text
              style={[styles.headerText, { color: themeValue.theme.fontColor }]}
            >
              AMOUNT
            </Text>
            <Text
              style={[styles.headerText, { color: themeValue.theme.fontColor }]}
            >
              SUM, $
            </Text>
          </View>
          <FlatList
            data={orders}
            renderItem={({ item, index }) => <BasketItem item={item} />}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>TOTAL</Text>
            <Text style={styles.total}>{`${getTotalPrice} $`}</Text>
          </View>
          <ButtonWrapper
            onPress={onPressButtonCheckout}
            style={styles.buttonCheckout}
          >
            <Text
              style={[
                styles.buttonCheckoutText,
                { backgroundColor: themeValue.theme.buttonCheckoutColor },
              ]}
            >
              CHECKOUT {`${getTotalPrice} $`}
            </Text>
          </ButtonWrapper>
        </>
      ) : (
        <Text>Basket is empty</Text>
      )}
    </View>
  );
};

export default observer(BasketScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    gap: 20,
    paddingRight: 40,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  headerText: {
    fontWeight: "700",
  },
  headerTextName: {
    flex: 1,
  },
  buttonCheckout: {
    flexDirection: "row",
    justifyContent: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 40,
    paddingLeft: 40,
    marginBottom: 30,
  },
  totalText: {
    fontSize: 20,
    color: "red",
    fontWeight: "900",
  },
  total: {
    fontSize: 20,
    color: "red",
    fontWeight: "900",
  },
  buttonCheckoutText: {
    width: "100%",
    textAlign: "center",
    padding: 20,
  },
});
