import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

const lightTheme = {
  mainBgColor: "#DFF3E8",
  itemPizzaBgColor: "#B9CAC1",
  mainBorderColor: "#4B4F56",
  buttonBgColor: "#93A099",
  modalBgColor: "#7D8882",
  iconsColor: "black",
  iconsColorRed: "red",
  rippleColor: "black",
  shadowColor: "black",
  navigationTabColor: "#7D8882",
  navigationStackColor: "#93A099",
  fontColor: "black",
  buttonCheckoutColor: "green",
};

export const darkTheme = {
  mainBgColor: "#4A515C",
  itemPizzaBgColor: "#2E3239",
  mainBorderColor: "#656E7D",
  buttonBgColor: "#23272E",
  modalBgColor: "#1E2227",
  iconsColor: "#A6B4CD",
  iconsColorRed: "red",
  rippleColor: "#A6B4CD",
  shadowColor: "#A6B4CD",
  navigationTabColor: "#1E2227",
  navigationStackColor: "#23272E",
  fontColor: "#A6B4CD",
  buttonCheckoutColor: "green",
};

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [scheme, setScheme] = useState(Appearance.getColorScheme());

  const systemTheme = Appearance.getColorScheme();

  const onColorSchemeChange = ({ colorScheme }) => {
    setScheme(colorScheme);
  };

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  }, []);

  const value = {
    scheme,
    theme: scheme == "dark" ? darkTheme : lightTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
