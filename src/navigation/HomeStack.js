import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "../modules/Home/HomeScreen";
import DescriptionPizzaScreen from "../modules/Home/DescriptionPizzaScreen";
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import FavoritesScreen from "../modules/Home/FavoritesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerIcon from "../modules/Home/DrawerIcon";
const Drawer = createDrawerNavigator();

function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerLabel: "There has to be some content here...",
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: styles.drawerLabel,
        drawerStyle: styles.drawer,
        sceneContainerStyle: styles.sceneContainer,
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pizza list"
        component={MyDrawer}
        options={({ navigation }) => ({
          headerStyle: styles.headerStyle,
          headerTitleAlign: "center",
          headerLeft: () => <DrawerIcon navigation={navigation} />,
        })}
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
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
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
  drawerItem: {
    backgroundColor: "transparent",
  },
  drawerLabel: {
    color: "black",
  },
  drawer: {
    backgroundColor: colors.mainBgColor,
  },
  sceneContainer: {
    backgroundColor: "red",
  },
});
