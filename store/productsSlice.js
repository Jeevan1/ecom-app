import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// Define an initial state
const initialState = {
  products: [],
  uniqueProducts: [],
  favourites: [],
  loading: false,
  error: "",
};

// Define an async thunk to fetch data from the API using Axios
export const fetchApiData = createAsyncThunk(
  "product/fetchApiData",
  async (p) => {
    try {
      const response = await API.get("/products?limit=0");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    uniqueProducts(state, action) {
      const filteredProducts = state.products.filter(
        (product) => product.category === action.payload
      );
      if (action.payload === "all") {
        state.uniqueProducts = state.products;
        return;
      }
      state.uniqueProducts = filteredProducts;
    },
    addFavourite(state, action) {
      state.favourites.push(action.payload);
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchApiData.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.uniqueProducts = action.payload;
      state.error = "";
      state.favourites = [];
    });
    builder.addCase(fetchApiData.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.uniqueProducts = [];
      state.favourites = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;

export const {
  getProductDetail,
  getAllProducts,
  getUniqueProducts,
  uniqueProducts,
  addFavourite,
  removeFavourite,
} = productSlice.actions;
