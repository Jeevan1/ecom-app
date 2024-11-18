import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const SearchInput = ({ style }) => {
  const navigation = useNavigation();
  const [text, setText] = useState("");

  let products = useSelector((state) => state.products.products);

  const handleClick = () => {
    navigation.navigate("Products", { text: text, filterProducts: products });
  };

  useEffect(() => {
    products = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
  }, [text, products]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        keyboardAppearance="light"
        onChangeText={(e) => setText(e)}
      />

      <Ionicons
        name="search"
        size={24}
        style={styles.icon}
        onPress={handleClick}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    fontWeight: "bold",
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  icon: {
    color: colors.primary,
  },
});
