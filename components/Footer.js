import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import Button from "./Button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Footer = ({ price, buttonText, onPress }) => {
  return (
    <View style={styles.container}>
      {price && (
        <View style={styles.priceWrapper}>
          <Text style={styles.beforePrice}>${(price - 10).toFixed(2)}</Text>
          <View style={styles.afterPrice}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      )}
      <Button
        text={buttonText}
        onPress={onPress}
        style={styles.footerButton}
        active
        textStyle={{ fontSize: 16, fontWeight: "bold" }}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderTopColor: colors.grey,
    height: 100,
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 30,
  },
  priceWrapper: {
    fontWeight: "bold",
    justifyContent: "space-between",
  },
  beforePrice: {
    textDecorationLine: "line-through",
    color: colors.medium,
    fontSize: 14,
    fontWeight: "bold",
  },
  afterPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    margin: 0,
  },
  price: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 24,
  },
  footerButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
