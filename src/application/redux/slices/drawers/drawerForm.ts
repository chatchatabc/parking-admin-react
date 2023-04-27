import { createSlice } from "@reduxjs/toolkit";

export const drawerForm = createSlice({
  name: "drawerForm",
  initialState: {
    show: false,
  },
  reducers: {
    drawerFormUpdate(state, action) {
      state.show = action.payload.show;
    },
  },
});

// Action creators are generated for each case reducer function
export const { drawerFormUpdate } = drawerForm.actions;

export default drawerForm.reducer;
