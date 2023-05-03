import { createSlice } from "@reduxjs/toolkit";

export const drawerForm = createSlice({
  name: "drawerForm",
  initialState: {
    show: false,
    title: null,
    content: null,
    mode: null,
    loading: false,
  },
  reducers: {
    drawerFormUpdate(state, action) {
      state.show = action.payload.show;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.mode = action.payload.mode;
      state.loading = action.payload.loading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { drawerFormUpdate } = drawerForm.actions;

export default drawerForm.reducer;
