import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: null,
  loading: false,
  error: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      let { data } = await axios.get("http://localhost:8080/api/v1/product");
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ token, productData }) => {
    try {
      let { data } = await axios.post(
        "http://localhost:8080/api/v1/product/",
        productData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ user, productId, updatedData }) => {
    try {
      let { data } = await axios.put(
        `http://localhost:8080/api/v1/product/${productId}`,
        updatedData,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  "products/deleteAProduct",
  async ({ token, productId }) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/${productId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.error.message;
    },
    [deleteAProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteAProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      let index = state.products.findIndex((product) => product._id === _id);
      state.products.splice(index, 1);
    },
    [deleteAProduct.rejected]: (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.error.message;
    },
    [addProduct.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = [...state.products, action.payload];
      state.error = false;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      // state.products = null;
      state.error = action.error.message;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      let index = state.products.findIndex((product) => product._id === _id);
      state.products[index] = action.payload;
      state.error = false;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
