import React, { useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { observer } from "mobx-react";
import HomeScreen from "../modules/Home/HomeScreen";
import SettingsScreen from "../modules/Settings/SettingsScreen";
import BasketScreen from "../modules/Basket/BasketScreen";
import HomeStack from "./HomeStack";
import { ThemeContext } from "../core/theme";
import basketStore from "../modules/Basket/BasketStore";

const Tab = createBottomTabNavigator();

const Header = ({ title }) => {
  const themeValue = useContext(ThemeContext);

  return (
    <Text
      style={{
        color: themeValue.theme.fontColor,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: themeValue.theme.navigationTabColor,
        color: themeValue.theme.fontColor,
        fontSize: 20,
        fontWeight: 900,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  );
};

const TabBarIconBasket = observer(({ size, color }) => {
  const themeValue = useContext(ThemeContext);

  const getTotalPrice = () => {
    let amount = 0;
    for (const item of basketStore.orders) {
      amount += item.amount;
    }
    return amount;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      <Text
        style={{
          color,
        }}
      >
        {getTotalPrice()}
      </Text>
      <SimpleLineIcons name="basket" size={size} color={color} />
    </View>
  );
});

const MyTabs = () => {
  const themeValue = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: themeValue.theme.navigationTabColor,
        },
        tabBarActiveTintColor: themeValue.theme.fontColor,
        tabBarInactiveTintColor: themeValue.theme.mainBgColor,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? 30 : 24;
            return (
              <MaterialCommunityIcons
                name="home-circle"
                color={color}
                size={iconSize}
              />
            );
          },
          header: () => {
            return <Header title="---HOME---" />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? 30 : 24;
            return <Feather name="settings" color={color} size={iconSize} />;
          },
          header: () => {
            return <Header title="---SETTINGS---" />;
          },
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? 30 : 24;
            return <TabBarIconBasket size={iconSize} color={color} />;
          },
          header: () => {
            return <Header title="---Basket---" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default Navigator;
