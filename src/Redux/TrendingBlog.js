import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import supabase from "../Utils/Supabase"

export const fetchBlogData = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("Blog").select("*")
    if (error) throw error
    return data
  } catch (error) {
    return rejectWithValue(error.message || 'An error occurred while fetching blog data')
  }
})
;

const trendingBlogSlice = createSlice({
  name: "blogData",
  initialState: {
    blogItems: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBlogData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.blogItems = action.payload
      })
      .addCase(fetchBlogData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default trendingBlogSlice.reducer