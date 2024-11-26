import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

const Button = ({ style, text, onPress, active, textStyle, ...props }) => {
  return (
    <Pressable
      android_ripple={{ color: colors.light }}
      style={[
        styles.button,
        style,
        active && {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.text,
          { color: active ? colors.white : colors.dark },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
  },
  text: {
    color: colors.dark,
    fontWeight: "bold",
    padding: 7,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
