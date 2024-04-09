import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { mockItemsData, refreshMockItemsData } from "../../utils/mock-data";
import ItemPizza from "../../components/ItemPizza";
import ButtonWrapper from "../../components/ButtonWrapper";
import { widthSlider } from "../../utils/widthSlider";
import Slide from "../../components/Slide";
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { ThemeContext } from "../../core/theme";

const HomeScreen = ({ navigation }) => {
  const initialFilters = {
    isNew: false,
    limit: 10,
    page: 1,
  };
  const [isVisibleInputSearch, setIsVisibleInputSearch] = useState(false);
  const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useSharedValue(100);

  const themeValue = useContext(ThemeContext);

  useEffect(() => {
    onEndReached();
  }, []);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 0],
        [0, 1],
        Extrapolation.CLAMP
      ),
      height:
        interpolate(scrollY.value, [200, 0], [0, 1], Extrapolation.CLAMP) * 100,
    };
  });

  const handleFilterModal = () => {
    setIsVisibleFilterModal(!isVisibleFilterModal);
  };

  const handleFilter = () => {
    setIsVisibleInputSearch(!isVisibleInputSearch);
  };

  const onChangeInputSearch = (value) => {
    setInputValue(value);
    changeFilteredItemsState("inputValue", value);
  };

  const handleFilters = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    changeFilteredItemsState("filter", value, filterName);
  };

  const changeFilteredItemsState = (name, value, filterName) => {
    let newFilteredItems;
    if (name === "inputValue") {
      newFilteredItems = mockItemsData.filter((item) =>
        item.title.toLowerCase().startsWith(value.toLowerCase())
      );
    }

    if (name === "filter") {
      newFilteredItems = mockItemsData.filter((item) =>
        value ? item[filterName] === value : item
      );
    }

    setFilteredItems(newFilteredItems);
  };

  const onEndReached = () => {
    const { limit, page } = filters;
    const firstIndex = page === 1 ? 0 : (page - 1) * limit;
    const lastIndex = limit * page;
    const newArr = mockItemsData.slice(firstIndex, lastIndex);

    setFilteredItems((prev) => [...prev, ...newArr]);
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      if (refreshMockItemsData[0]?.id !== filteredItems[0]?.id) {
        setFilteredItems([...refreshMockItemsData, ...filteredItems]);
      }
      setRefreshing(false);
    }, 3000);
  }, []);

  const onPressItemPizza = (item) => {
    navigation.navigate("Description", { item });
  };

  const onPressButtonHearth = () => {
    const favoritesItems = mockItemsData.filter((item) => item.isFavorites);
    navigation.navigate("Favorites", { favoritesItems });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeValue.theme.mainBgColor },
      ]}
    >
      <Animated.View
        style={[
          styles.header,
          animatedStyle,
          {
            backgroundColor: themeValue.theme.itemPizzaBgColor,
            borderColor: themeValue.theme.mainBorderColor,
          },
        ]}
      >
        <View style={styles.headerTop}>
          {isVisibleInputSearch ? (
            <Animated.View
              entering={LightSpeedInLeft}
              exiting={LightSpeedOutLeft}
              style={[styles.inputContainer]}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: themeValue.theme.buttonBgColor,
                    color: themeValue.theme.fontColor,
                  },
                ]}
                onChangeText={onChangeInputSearch}
                value={inputValue}
                placeholder="search"
                placeholderTextColor={themeValue.theme.fontColor}
              />
            </Animated.View>
          ) : null}

          <ButtonWrapper
            style={styles.buttonHearth}
            onPress={onPressButtonHearth}
            isCustomStyle={false}
            isRipple={false}
          >
            <AntDesign
              name="heart"
              size={24}
              color={themeValue.theme.iconsColorRed}
            />
          </ButtonWrapper>
          <ButtonWrapper
            style={styles.buttonSearch}
            onPress={handleFilter}
            isCustomStyle={false}
            isRipple={false}
          >
            <AntDesign
              name="search1"
              size={24}
              color={themeValue.theme.iconsColor}
            />
          </ButtonWrapper>
        </View>
        <ButtonWrapper onPress={handleFilterModal} style={styles.headerBottom}>
          <Text style={[{ color: themeValue.theme.fontColor }]}>Filters</Text>
        </ButtonWrapper>
      </Animated.View>
      {filteredItems.length ? (
        <Animated.FlatList
          data={filteredItems}
          renderItem={({ item, index }) => (
            <ItemPizza item={item} onPressItemPizza={onPressItemPizza} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.itemsWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          initialNumToRender={10}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          onScroll={scrollHandler}
        />
      ) : (
        <Text style={[{ backgroundColor: themeValue.theme.modalBgColor }]}>
          No data
        </Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleFilterModal}
        onRequestClose={handleFilterModal}
      >
        <TouchableWithoutFeedback onPress={handleFilterModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.filterModal,
            { backgroundColor: themeValue.theme.modalBgColor },
          ]}
        >
          <Checkbox
            value={filters.isNew}
            onValueChange={(value) => handleFilters("isNew", value)}
            style={styles.filterModalCheckbox}
          />
          <Text style={[styles.label, { color: themeValue.theme.fontColor }]}>
            Only new
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    gap: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
  },
  headerTop: {
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  headerBottom: {
    alignItems: "center",
  },
  inputContainer: {
    flexGrow: 1,
  },
  input: {
    padding: 8,
    borderRadius: 5,
    color: "red",
  },
  buttonHearth: {
    padding: 10,
  },
  buttonSearch: {
    padding: 10,
  },
  itemsWrapper: {
    width: "100%",
    paddingTop: 10,
  },
  filterModal: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "20%",
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
});
