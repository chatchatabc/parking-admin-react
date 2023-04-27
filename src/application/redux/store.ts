import { configureStore } from "@reduxjs/toolkit";
import drawerFormReducer from "./slices/drawers/drawerForm";

export default configureStore({
  reducer: {
    drawerForm: drawerFormReducer,
  },
});
