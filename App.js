import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { mockItemsData } from "./utils/mock-data";
import ItemPizza from "./components/ItemPizza";
import ButtonWrapper from "./components/ButtonWrapper";
import { colors } from "./utils/colors";

export default function App() {
  const initialFilters = {
    isNew: false,
  };
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleInputSearch, setIsVisibleInputSearch] = useState(false);
  const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState(mockItemsData);
  const [filters, setFilters] = useState(initialFilters);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    changeFilteredItemsState();
  }, [inputValue, filters]);

  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleFilterModal = () => {
    setIsVisibleFilterModal(!isVisibleFilterModal);
  };

  const handleFilter = () => {
    setIsVisibleInputSearch(!isVisibleInputSearch);
  };

  const onChangeInputSearch = (value) => {
    setInputValue(value);
  };

  const handleFilters = (filterName, value) => {
    setFilters({ [filterName]: value });
  };

  const changeFilteredItemsState = () => {
    const filteredItems = mockItemsData.filter((item) => {
      let isTitleMatch = true;
      let isNewMatch = true;

      if (inputValue) {
        isTitleMatch = item.title
          .toLowerCase()
          .startsWith(inputValue.toLowerCase());
      }
      if (filters.isNew) {
        isNewMatch = item.isNew;
      }

      return isTitleMatch && isNewMatch;
    });
    setFilteredItems(filteredItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {isVisibleInputSearch ? (
            <TextInput
              style={styles.input}
              onChangeText={onChangeInputSearch}
              value={inputValue}
              placeholder="search"
            />
          ) : null}
          <ButtonWrapper
            style={styles.buttonHearth}
            onPress={handleModal}
            isCustomStyle={false}
            isRipple={false}
          >
            <AntDesign name="heart" size={24} color={colors.iconsColorRed} />
          </ButtonWrapper>
          <ButtonWrapper
            style={styles.buttonSearch}
            onPress={handleFilter}
            isCustomStyle={false}
            isRipple={false}
          >
            <AntDesign name="search1" size={24} color={colors.iconsColor} />
          </ButtonWrapper>
        </View>
        <ButtonWrapper onPress={handleFilterModal} style={styles.headerBottom}>
          <Text>Filters</Text>
        </ButtonWrapper>
      </View>
      {filteredItems.length ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item, index }) => <ItemPizza item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.itemsWrapper}
        />
      ) : (
        <Text>No data</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleModal}
        onRequestClose={handleModal}
      >
        <TouchableWithoutFeedback onPress={handleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <ButtonWrapper onPress={handleModal}>
            <Text>Close Modal</Text>
          </ButtonWrapper>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleFilterModal}
        onRequestClose={handleFilterModal}
      >
        <TouchableWithoutFeedback onPress={handleFilterModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.filterModal}>
          <Checkbox
            value={filters.isNew}
            onValueChange={(value) => handleFilters("isNew", value)}
            style={styles.filterModalCheckbox}
          />
          <Text style={styles.label}>Only new</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    backgroundColor: colors.mainBgColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    gap: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.mainBorderColor,
    backgroundColor: colors.itemPizzaBgColor,
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
  input: {
    paddingLeft: 10,
    flexGrow: 1,
    backgroundColor: colors.buttonBgColor,
    borderRadius: 5,
  },
  buttonHearth: {
    padding: 10,
  },
  buttonSearch: {
    padding: 10,
  },
  itemsWrapper: {
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
  },
  modal: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBgColor,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    backgroundColor: colors.modalBgColor,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
});
