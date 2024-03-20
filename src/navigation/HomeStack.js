import React, { useContext } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../modules/Home/HomeScreen";
import DescriptionPizzaScreen from "../modules/Home/DescriptionPizzaScreen";
import { StyleSheet } from "react-native";
import FavoritesScreen from "../modules/Home/FavoritesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerIcon from "../modules/Home/DrawerIcon";
import { ThemeContext } from "../../src/core/theme";

const Drawer = createDrawerNavigator();

function MyDrawer({ navigation }) {
  const themeValue = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerLabel: "There has to be some content here...",
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: {
          color: themeValue.theme.fontColor,
        },
        drawerStyle: {
          backgroundColor: themeValue.theme.mainBgColor,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

const HomeStack = () => {
  const themeValue = useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pizza list"
        component={MyDrawer}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeValue.theme.navigationStackColor,
          },
          headerTintColor: themeValue.theme.fontColor,
          headerTitleAlign: "center",
          headerLeft: () => <DrawerIcon navigation={navigation} />,
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="Description"
        component={DescriptionPizzaScreen}
        options={{
          headerStyle: {
            backgroundColor: themeValue.theme.navigationStackColor,
          },
          headerTintColor: themeValue.theme.fontColor,
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerStyle: {
            backgroundColor: themeValue.theme.navigationStackColor,
          },
          headerTintColor: themeValue.theme.fontColor,
          headerTitleAlign: "center",
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  drawerItem: {
    backgroundColor: "transparent",
  },
});
