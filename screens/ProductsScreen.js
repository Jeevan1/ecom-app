import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Products from "../components/Products";
import { useSelector } from "react-redux";

const ProductsScreen = ({ navigation, route }) => {
  const products = useSelector((state) => state.products.products);
  const { text, filterProducts } = route.params || {};
  return (
    <View style={styles.container}>
      {text && (
        <Text style={styles.text}>
          Showing results for <Text style={{ fontWeight: "bold" }}>{text}</Text>
        </Text>
      )}
      {filterProducts.length > 0 ? (
        <Products products={products ? filterProducts : products} />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No products found
        </Text>
      )}
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 15,
  },
  text: {
    fontSize: 20,
    color: colors.medium,
    marginBottom: 20,
  },
});
