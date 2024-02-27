import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import { widthSlider } from "../utils/widthSlider";

const Slide = ({ slide }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Share.share({
          url: slide.uri,
          message: slide.uri,
        });
      }}
    >
      <View style={styles.slide}>
        <Image
          style={styles.image}
          source={{
            uri: slide.uri,
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
