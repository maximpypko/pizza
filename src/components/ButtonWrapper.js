import { View, Pressable, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

const ButtonWrapper = ({
  children,
  disabled,
  withoutFeedback,
  onPress,
  style,
  isCustomStyle = true,
  isRipple = true,
}) => {
  return (
    <View style={isCustomStyle && styles.container}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={isRipple && styles.ripple}
        style={({ pressed }) => [
          styles.buttonStyle,
          !withoutFeedback && {
            ...(isCustomStyle && styles.customStyles),
            ...(pressed && styles.pressedButtonStyle),
            ...(disabled && styles.disabledButtonStyle),
            ...styles.ripple,
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
    borderColor: colors.mainBorderColor,
    borderRadius: 5,
  },
  customStyles: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: colors.buttonBgColor,
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
    color: colors.rippleColor,
    borderless: false,
  },
});

export default ButtonWrapper;
