import { createSlice } from "@reduxjs/toolkit"

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") || "light",
  },
  reducers: {
    themeChange: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
      localStorage.setItem("theme", state.mode)
    },
  },
})

export const { themeChange } = ThemeSlice.actions
export default ThemeSlice.reducer