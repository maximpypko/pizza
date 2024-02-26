import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthSlider } from "../utils/widthSlider";

const Slide = ({ slide }) => {
  return (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={{
          uri: slide.uri,
        }}
      />
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  image: {
    width: widthSlider,
    height: widthSlider,
  },
});
