import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../modules/Home/HomeScreen";
import DescriptionPizzaScreen from "../modules/Home/DescriptionPizzaScreen";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import FavoritesScreen from "../modules/Home/FavoritesScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pizza list"
        component={HomeScreen}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Description"
        component={DescriptionPizzaScreen}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleAlign: "center",
          presentation: "modal",
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.navigationStackColor,
  },
});
