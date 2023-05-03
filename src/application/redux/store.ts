import { configureStore } from "@reduxjs/toolkit";
import drawerFormReducer from "./slices/drawers/drawerForm";
import globalStateReducer from "./slices/globalState";

export default configureStore({
  reducer: {
    drawerForm: drawerFormReducer,
    globalState: globalStateReducer,
  },
});
