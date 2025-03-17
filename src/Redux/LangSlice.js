import { createSlice } from "@reduxjs/toolkit"

const LangSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("Lang") || "EN",
  },
  reducers: {
    langChange: (state) => {
      state.mode = state.mode === "EN" ? "AZ" : "EN"
      localStorage.setItem("Lang", state.mode)
    },
  },
})

export const { langChange } = LangSlice.actions
export default LangSlice.reducer