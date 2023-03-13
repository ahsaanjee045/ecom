import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const totalAmount = (arr) => {
  return arr?.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
const totalQty = (arr) => {
  return arr?.reduce((acc, item) => acc + item.quantity, 0);
};
const initialState = {
  cart: null,
  loading: false,
  error: false,
  subTotal: null,
  totalQty: null,
};

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async () => {}
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token) => {
    try {
      let { data } = await axios.get("http://localhost:8080/api/v1/cart", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ user, cartItem }) => {
    try {
      let { data } = await axios.put(
        "http://localhost:8080/api/v1/cart/addToCart",
        cartItem,
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

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async ({ user, productId}) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:8080/api/v1/cart/deleteFromCart/${productId}`,
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      // console.log(action.payload)
      state.subTotal = totalAmount(action.payload.items);
      state.totalQty = totalQty(action.payload.items);
      state.error = false;
    },
    [fetchCartItems.error]: (state) => {
      state.loading = true;
      state.error = action.error.message;
    },
    [addCartItem.pending]: (state) => {
      state.loading = true;
      state.cart = null;
      state.error = false;
    },
    [addCartItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.subTotal = totalAmount(action.payload.items);
      state.totalQty = totalQty(action.payload.items);
    },
    [addCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteFromCart.pending]: (state) => {
      state.loading = true;
      state.cart = null;
      state.error = false;
    },
    [deleteFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.subTotal = totalAmount(action.payload.items);
      state.totalQty = totalQty(action.payload.items);
    },
    [deleteFromCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default cartSlice.reducer;
