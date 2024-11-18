import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function ImageButton({ url, onPress, height, width, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Image source={url} style={{ height, width }} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.grey,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
