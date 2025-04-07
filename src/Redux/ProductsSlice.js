import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import supabase from "../Utils/Supabase"

export const fetchProductData = createAsyncThunk("productData/fetchData", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("Product").select("*")
    if (error) throw error
    return data
  } catch (error) {
    return rejectWithValue(error.message || 'An error occurred while fetching blog data')
  }
})
;

const productDataSlice = createSlice({
  name: "productData",
  initialState: {
    productItems: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.productItems = action.payload
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default productDataSlice.reducer


