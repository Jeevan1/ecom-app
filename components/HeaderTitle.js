import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Pressable android_ripple={{ color: "red" }} style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/user/user.jpg")}
        />

        <Text style={styles.text}>Bj's Liquors Shop</Text>
      </Pressable>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.dark,
  },
});
