import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const ItemPizza = ({ item }) => {
    const { title, isNew, image } = item;
    const [isFavorites, setIsFavorites] = useState(item.isFavorites);

    onPressButtonHeart = () => {
        setIsFavorites(!isFavorites)
    }

    onPressButtonBuy = () => {
        console.warn('You have added an item to your cart')
    }
    return (
        <View style={styles.container}>
            <View style={styles.itemImage}>
                <Image style={styles.headerImage} source={{
                    uri: image
                }} />
                {isNew &&
                    <Text style={styles.mark}>New</Text>
                }
            </View>
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Pressable onPress={onPressButtonHeart}>
                        <AntDesign name={isFavorites ? "heart" : "hearto"} size={22} color="red" />
                    </Pressable>
                </View>
                <View style={styles.prices}>
                    {isNew && <Text style={styles.newPrices}>New Price</Text>}
                    <Text style={isNew && styles.oldPrices}>Old Price</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
                        Juicy pizza with thin crispy crust, generously topped with fresh ingredients.
                    </Text>
                    <View style={styles.buttonBuy}>
                        <Pressable onPress={onPressButtonBuy}>
                            <Text style={styles.description}>Buy</Text>
                        </Pressable>
                        <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ItemPizza;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 12,
        flexDirection: 'row',
        gap: 15,
        backgroundColor: "#B9CAC1",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4B4F56",
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 4
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
    },
    itemImage: {
        position: 'relative'
    },
    mark: {
        position: 'absolute',
        right: -13,
        top: -10,
        zIndex: 2,
        paddingTop: 3,
        paddingRight: 5,
        paddingBottom: 3,
        paddingLeft: 5,
        backgroundColor: '#DFF3E8',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4B4F56",
        borderRadius: 15,
        fontSize: 11,
        overflow: 'hidden'
    },
    headerImage: {
        width: 100,
        height: 100
    },
    info: {
        flexShrink: 1,
        justifyContent: 'space-between'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 17
    },
    favoritesContainer: {
        width: 45,
        height: 45
    },
    favorites: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4B4F56",
        width: 33,
        height: 33
    },
    prices: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 15
    },
    newPrices: {
        fontSize: 20,
        fontWeight: '900'
    },
    oldPrices: {
        textDecorationLine: 'line-through'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-center',
        gap: 10
    },
    description: {
        flexShrink: 1,
    },
    buttonBuy: {
        flexDirection: 'row',
        gap: 5
    }
});
