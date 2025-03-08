import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import isDarkModeReducer from "./darkSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    isDarkMode: isDarkModeReducer,
  },
});

export { store };
