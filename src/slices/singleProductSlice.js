import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    product: null,
    loading: false,
    error: false
};

export const fetchSingleProduct = createAsyncThunk(
    "singleProduct/fetchSingleProduct",
    async (productId) => {
       try {
        let {data} = await axios.get(`http://localhost:8080/api/v1/product/${productId}`)
        return data
       } catch (error) {
        throw new Error(error.response.data.message);
       }
    }
)

export const createProductReview = createAsyncThunk("singleProduct/createProductReview", async ({productId , newReview}) => {
    try {
        let {data} = await axios.put(`http://localhost:8080/api/v1/product/review/${productId}`, newReview , {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${newReview.token}`,
            }
        })
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message);
    }

})

const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {},
    extraReducers : {
        [fetchSingleProduct.pending] : (state) => {
            state.loading = true;
            state.error = false;
        },
        [fetchSingleProduct.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false;
        },
        [fetchSingleProduct.rejected] : (state, action) => {
            state.loading = false;
            state.product = null;
            state.error = action.error.message;
        },
        [createProductReview.pending] : (state, action) => {
            state.loading = true;
            // state.product = null;
            state.error = false;
        },
        [fetchSingleProduct.fulfilled] : (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false;
        },
        [fetchSingleProduct.rejected] : (state, action) => {
            state.loading = false;
            // state.product = null;
            state.error = action.error.message;
        },
        
    }
})

export default singleProductSlice.reducer