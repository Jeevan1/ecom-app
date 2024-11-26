import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import colors from "../constants/colors";

const Products = ({ products, handleScrollToTop }) => {
  return (
    <View style={styles.container}>
      {/* {products.map((product) => {
        return <ProductCard item={product} key={product.id} />;
      })} */}
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ProductCard
            key={index}
            item={item}
            handleScrollToTop={handleScrollToTop}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 20 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    marginTop: 15,
  },
});
