import React, { useLayoutEffect } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../constants/colors";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";
import { useSelector } from "react-redux";

const CartScreen = ({ route, navigation }) => {
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);

  const cartsItems = cartItems.map((item) =>
    products.find((p) => p.id === item.id)
  );
  let deliveryFee = 10;

  let subTotal = cartsItems.reduce(
    (acc, item) =>
      acc + cartItems.find((i) => i.id === item.id).quantity * item.price,
    0
  );
  let total = subTotal + deliveryFee;
  let Discount = 4;

  let finalPrice = (total - (total * Discount) / 100).toFixed(2);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My cart",
      headerRight: null,
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTintColor: colors.black,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  });
  if (cartItems.length === 0) {
    finalPrice = 0;
    Discount = 0;
    subTotal = 0;
    deliveryFee = 0;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Button
          color={colors.primary}
          title="Shop Now"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* <ScrollView style={styles.scrollContainer}> */}
      <FlatList
        style={styles.scrollContainer}
        data={cartsItems}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* </ScrollView> */}
      <View style={styles.content}>
        <SearchInput style={{ marginBottom: 20 }} />
        <View style={styles.contentDesc}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.price}>${subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.contentDesc}>
          <Text style={styles.text}>Delivery Fee:</Text>
          <Text style={styles.price}>${deliveryFee}</Text>
        </View>
        <View style={styles.contentDesc}>
          <Text style={styles.text}>Discount:</Text>
          <Text style={styles.price}>-{Discount}%</Text>
        </View>
      </View>
      <Footer buttonText={`Checkout for $${finalPrice}`} onPress={() => {}} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.medium,
    marginBottom: 20,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  content: {
    padding: 30,
  },
  contentDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontWeight: "500",
    color: colors.dark,
  },
  price: {
    fontWeight: "bold",
    color: colors.black,
  },
});
