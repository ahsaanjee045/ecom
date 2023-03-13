import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialuser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: initialuser,
  loading: false,
  error: false,
};

export const registerUser = createAsyncThunk(
  "/users/register",
  async (data) => {
    try {
      let res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        data
      );
      if (res.data) {
        try {
          await axios.post(
            "http://localhost:8080/api/v1/cart",
            {},
            {
              headers: {
                authorization: `Bearer ${res.data.token}`,
              },
            }
          );
          console.log("cart created successfully");
        } catch (error) {
          console.log("cart not created successfully");
          throw new Error(error.response.data.message);
        }
      }
      return res.data;
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk("/users/login", async (data) => {
  try {
    let res = await axios.post("http://localhost:8080/api/v1/user/login", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchAllUsers = createAsyncThunk(
  "/users/fetchAllUsers",
  async (user) => {
    try {
      let { data } = await axios.get("http://localhost:8080/api/v1/user/", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  "user/updateUserAdmin",
  async ({ nuser, user }) => {
    try {
      let { data } = await axios.put(
        `http://localhost:8080/api/v1/user/${nuser._id}`,
        {},
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ nuser, user }) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:8080/api/v1/user/${nuser._id}`,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    },
    [fetchAllUsers.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = false;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateUserAdmin.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateUserAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      let index = state.users.findIndex((user) => user._id === _id);
      state.users[index] = action.payload;
      state.error = false;
    },
    [updateUserAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      let index = state.users.findIndex((user) => user._id === _id);
      state.users.splice(index, 1);
      state.error = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
