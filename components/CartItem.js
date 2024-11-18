import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../constants/colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCart } from "../store/cartSlice";

const CartItem = ({ item }) => {
  const cartItems = useSelector((state) => state.cart);
  let [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(cartItems.find((i) => i.id === item.id).quantity);
  }, [quantity, cartItems]);

  const handleRemoveCart = () => {
    dispatch(removeCartItem({ id: item.id, quantity: quantity }));
  };
  return (
    <View style={styles.body}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.thumbnail,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.content, styles.titleContainer]}>
          <View style={{ width: "90%" }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.size}>{item.category}</Text>
          </View>
          <Entypo
            name="cross"
            size={20}
            style={styles.removeCartItem}
            color={colors.medium}
            onPress={handleRemoveCart}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.price}>${item.price * quantity}</Text>
          <View style={styles.quantityContainer}>
            <Pressable
              android_ripple={{ color: colors.light }}
              style={[styles.iconWrapper, quantity === 1 && { opacity: 0.5 }]}
              onPress={() => {
                if (quantity > 1) {
                  dispatch(updateCart({ id: item.id, quantity: quantity - 1 }));
                }
              }}
              disabled={quantity === 1}
            >
              <Ionicons
                name="remove"
                size={24}
                color={colors.medium}
                style={styles.icons}
              />
            </Pressable>
            <Text style={styles.input}>{quantity}</Text>
            <Pressable
              android_ripple={{ color: colors.light }}
              style={[
                styles.iconWrapper,
                quantity === item.stock && { opacity: 0.5 },
              ]}
              onPress={() => {
                if (quantity < item.stock) {
                  dispatch(updateCart({ id: item.id, quantity: quantity + 1 }));
                }
              }}
              disabled={quantity === item.stock}
            >
              <Ionicons
                name="add"
                size={24}
                color={colors.medium}
                style={styles.icons}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  body: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
    gap: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.grey,
    paddingVertical: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: colors.grey,
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.dark,
  },
  removeCartItem: {
    marginLeft: "auto",
  },
  size: {
    color: colors.medium,
    fontWeight: "bold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.dark,
  },
  input: {
    width: 30,
    textAlign: "center",
  },

  iconWrapper: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grey,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  icons: {
    fontSize: 18,
  },
});
