import React, { useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../core/theme";

const ButtonWrapper = ({
  children,
  disabled,
  withoutFeedback,
  onPress,
  style,
  isCustomStyle = true,
  isRipple = true,
}) => {
  const themeValue = useContext(ThemeContext);

  return (
    <View
      style={
        isCustomStyle && [
          styles.container,
          { borderColor: themeValue.theme.mainBorderColor },
        ]
      }
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={
          isRipple && [styles.ripple, { color: themeValue.theme.rippleColor }]
        }
        style={({ pressed }) => [
          styles.buttonStyle,
          !withoutFeedback && {
            ...(isCustomStyle && [
              styles.customStyles,
              { backgroundColor: themeValue.theme.buttonBgColor },
            ]),
            ...(pressed && styles.pressedButtonStyle),
            ...(disabled && styles.disabledButtonStyle),
            ...[styles.ripple, { color: themeValue.theme.rippleColor }],
            ...style,
          },
        ]}
      >
        {({ pressed }) => children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
  },
  customStyles: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonStyle: {
    opacity: 1,
  },
  pressedButtonStyle: {
    opacity: 0.7,
  },
  disabledButtonStyle: {
    opacity: 0.4,
  },
  ripple: {
    borderless: false,
  },
});

export default ButtonWrapper;
