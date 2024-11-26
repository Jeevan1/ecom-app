import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { uniqueProducts } from "../store/productsSlice";
import { useNavigation } from "@react-navigation/native";
import Products from "./Products";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState(["All"]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categoryProducts = useSelector(
    (state) => state.products.uniqueProducts
  );

  const handleCategoryPress = (index, category) => {
    setActiveCategory(index);
    dispatch(uniqueProducts(category.toLowerCase()));
  };

  useEffect(() => {
    dispatch(uniqueProducts("all"));
    setCategories([
      "All",
      ...new Set(
        products.map(
          (item) =>
            item.category.charAt(0).toUpperCase() + item.category.slice(1)
        )
      ),
    ]);
  }, [products]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.mainText]}>Categories</Text>
        <Pressable
          onPress={() =>
            navigation.navigate("Products", { filterProducts: products })
          }
        >
          <Text style={styles.text}>See all</Text>
        </Pressable>
      </View>
      <View style={styles.categories}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Button
              style={styles.button}
              active={activeCategory === index}
              text={item}
              onPress={() => handleCategoryPress(index, item)}
            />
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Products products={categoryProducts} />
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 16,
  },
  mainText: {
    fontSize: 20,
    color: colors.dark,
  },
  categories: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginRight: 10,
  },
});
