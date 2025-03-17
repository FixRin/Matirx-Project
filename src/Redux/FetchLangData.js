import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import supabase from "../Utils/Supabase"

export const fetchData = createAsyncThunk("languageData/fetchData", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("LanguageChange").select("*")
    if (error) throw error
    return data
  } catch (error) {
    return rejectWithValue(error.message || 'An error occurred while fetching language data')
  }
});

const fetchLangDataSlice = createSlice({
  name: "languageData",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default fetchLangDataSlice.reducer