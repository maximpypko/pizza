import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../utils/colors";
import { widthSlider } from "../../utils/widthSlider";
import ButtonWrapper from "../../components/ButtonWrapper";
import Slide from "../../components/Slide";
import SliderItemIndicator from "../../components/SliderItemIndicator";

const FavoritesScreen = ({ route }) => {
  const { favoritesItems } = route.params;
  const [indexActiveSlide, setIndexActiveSlide] = useState(0);
  const sliderRef = useRef();
  const autoscrollTime = 5000;
  useEffect(() => {
    let scrollInterval;

    const scrollToIndex = () => {
      const lastIndex = favoritesItems?.length - 1;
      if (favoritesItems?.length) {
        scrollInterval = setInterval(() => {
          if (indexActiveSlide < lastIndex) {
            onScroll();

            sliderRef.current.scrollToIndex({
              animated: true,
              index: indexActiveSlide + 1,
            });
          } else {
            clearInterval(scrollInterval);
          }
        }, autoscrollTime);
      }
    };

    scrollToIndex();

    return () => clearInterval(scrollInterval);
  }, [indexActiveSlide, favoritesItems]);

  const getItemLayout = (data, index) => ({
    length: 1,
    offset: widthSlider * index,
    index,
  });

  const renderIndicators = () => {
    return favoritesItems.map((_, i) => (
      <SliderItemIndicator key={i} isActive={i === indexActiveSlide} />
    ));
  };

  const onScroll = (x = null) => {
    let slideIndex = indexActiveSlide;
    if (x) {
      slideIndex = Math.round(x / widthSlider);
    }
    setIndexActiveSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      {favoritesItems?.length > 0 ? (
        <>
          <FlatList
            getItemLayout={getItemLayout}
            style={styles.photos}
            ref={sliderRef}
            data={favoritesItems}
            renderItem={({ item, index }) => {
              return <Slide item={item} />;
            }}
            keyExtractor={(slide, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({
              nativeEvent: {
                contentOffset: { x },
              },
            }) => onScroll(x)}
          />
          <View style={styles.slidesIndicatorList}>{renderIndicators()}</View>
        </>
      ) : (
        <Text>No photos</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.mainBgColor,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  photos: {
    width: widthSlider,
  },
  description: {
    marginBottom: 20,
  },
  slidesIndicatorList: {
    width: widthSlider,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
});
