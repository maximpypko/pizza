import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../utils/colors";
import { widthSlider } from "../utils/widthSlider";
import ButtonWrapper from "./ButtonWrapper";
import Slide from "./Slide";
import SliderItemIndicator from "./SliderItemIndicator";

const SliderModal = ({
  isVisibleSliderModal,
  handleSliderModal,
  sliderData,
}) => {
  const { photos, title } = sliderData;
  const [indexActiveSlide, setIndexActiveSlide] = useState(0);
  const sliderRef = useRef();
  const autoscrollTime = 5000;
  useEffect(() => {
    let scrollInterval;

    const scrollToIndex = () => {
      const lastIndex = photos?.length - 1;
      if (photos?.length) {
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
  }, [indexActiveSlide, photos]);

  const getItemLayout = (data, index) => ({
    length: 1,
    offset: widthSlider * index,
    index,
  });

  const renderIndicators = () => {
    return photos.map((_, i) => (
      <SliderItemIndicator key={i} isActive={i === indexActiveSlide} />
    ));
  };

  const onRequestClose = () => {
    handleSliderModal();
  };

  const onScroll = (x = null) => {
    let slideIndex = indexActiveSlide;
    if (x) {
      slideIndex = Math.round(x / widthSlider);
    }
    setIndexActiveSlide(slideIndex);
  };

  return (
    <Modal animationType="slide" transparent onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>

        {photos?.length > 0 ? (
          <>
            <FlatList
              getItemLayout={getItemLayout}
              style={styles.photos}
              ref={sliderRef}
              data={photos}
              renderItem={({ item, index }) => {
                return <Slide slide={item} />;
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
          <Text>No data</Text>
        )}
        <ButtonWrapper onPress={handleSliderModal}>
          <Text>Close Modal</Text>
        </ButtonWrapper>
      </View>
    </Modal>
  );
};

export default SliderModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modal: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.modalBgColor,
    paddingTop: 30,
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  photos: {
    width: widthSlider,
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
