import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import IconButton from "./IconButton";
import { AuthContext } from "../store/auth-context";
import Toast from "react-native-toast-message";

const HeaderRight = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart);

  const authCtx = useContext(AuthContext);
  const handleClick = () => {
    navigation.navigate("Cart");
  };
  const handleLogin = () => {
    authCtx.logout();
    Toast.show({
      type: "success",
      text1: "Logged out!!",
    });
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="exit"
        color={colors.secondary}
        size={18}
        onPress={handleLogin}
      />
      <Pressable onPress={handleClick}>
        <View style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={24} style={styles.cart} />
          <Text style={styles.badge}>{cartItems.length}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  cartContainer: {
    position: "relative",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  cart: {
    color: colors.dark,
    fontSize: 20,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    color: colors.white,
    padding: 1,
    width: 20,
    height: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
});
