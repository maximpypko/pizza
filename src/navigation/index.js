import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import HomeScreen from "../modules/Home/HomeScreen";
import SettingsScreen from "../modules/Settings/SettingsScreen";
import { colors } from "../utils/colors";
import { StyleSheet } from "react-native";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.iconsColor,
        tabBarInactiveTintColor: colors.navigationStackColor,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerStyle: styles.headerStyle,
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
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: styles.headerStyle,
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? 30 : 24;
            return <Feather name="settings" color={color} size={iconSize} />;
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navigationTabColor,
  },
  headerStyle: {
    backgroundColor: colors.navigationTabColor,
  },
});
