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

const Slide = ({ item }) => {
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
        <Text style={styles.title}>{item.title}</Text>
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
