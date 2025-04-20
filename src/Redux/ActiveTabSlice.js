// features/activeTabSlice.js
import { createSlice } from '@reduxjs/toolkit';

const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState: 'dashboard', // or whatever default tab you want
  reducers: {
    setActiveTab: (state, action) => action.payload,
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
