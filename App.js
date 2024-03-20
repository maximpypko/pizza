import "react-native-gesture-handler";
import React from "react";
import Navigator from "./src/navigation";
import { ThemeProvider } from "./src/core/theme";

export default function App() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
