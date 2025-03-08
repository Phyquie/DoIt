import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "isDarkMode",
  initialState: {
    isDarkMode: localStorage.getItem('isDarkMode') === 'true',
    isGridView: localStorage.getItem('isGridView') === 'true',
  },

  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setGridView: (state) => {
      state.isGridView = !state.isGridView;
    },
  },
});

export const { toggleDarkMode , setGridView } = darkSlice.actions;
export default darkSlice.reducer;