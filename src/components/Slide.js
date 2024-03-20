import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import { widthSlider } from "../utils/widthSlider";
import { ThemeContext } from "../core/theme";

const Slide = ({ item }) => {
  const themeValue = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        Share.share({
          url: item.image,
          message: item.image,
        });
      }}
    >
      <View style={styles.slide}>
        <Text style={[styles.title, { color: themeValue.theme.fontColor }]}>
          {item.title}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Slide;

const styles = StyleSheet.create({
  image: {
    width: widthSlider,
    height: widthSlider,
  },
});
