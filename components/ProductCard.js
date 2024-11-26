import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item, handleScrollToTop }) => {
  const navigation = useNavigation();
  const handleClick = () => {
    handleScrollToTop && handleScrollToTop();
    navigation.navigate("Details", { item: item });
  };
  return (
    <View style={styles.container} key={item.id}>
      <Pressable
        android_ripple={{ color: colors.light }}
        style={styles.burron}
        onPress={handleClick}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.thumbnail,
            }}
            alt="product"
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </Pressable>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "48.5%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  burron: {
    width: "100%",
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 20,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 140,
    objectFit: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.medium,
    marginVertical: 5,
    paddingHorizontal: 5,
    maxHeight: 38,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    paddingHorizontal: 5,
  },
});
