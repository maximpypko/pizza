import React, { useState } from "react";
import { DrawerActions } from "@react-navigation/native";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DrawerIcon = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      navigation.dispatch(DrawerActions.closeDrawer());
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={toggleDrawer}>
      <MaterialCommunityIcons
        name={
          isDrawerOpen
            ? "clipboard-arrow-left-outline"
            : "clipboard-arrow-right-outline"
        }
        size={30}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default DrawerIcon;
