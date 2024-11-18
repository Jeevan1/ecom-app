import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItem(state, action) {
      const { id, quantity, navigation } = action.payload;

      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        Toast.show({
          type: "error",
          text1: "Item Already Added!",
          onPress: () => {
            Toast.hide();
            navigation.navigate("Cart");
          },
        });
        return;
      }
      state.push({ id, quantity });
      Toast.show({
        type: "success",
        text1: "Item Added!",
        text2: `has been added to your cart`,
        onPress: () => {
          Toast.hide();
          navigation.navigate("Cart");
        },
      });
    },
    removeCartItem: (state, action) => {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    },
    updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        return state.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
    },
  },
});

export const { addCartItem, removeCartItem, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
