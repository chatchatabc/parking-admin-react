import { createSlice } from "@reduxjs/toolkit";

export const globalState = createSlice({
  name: "globalState",
  initialState: {
    reset: false,
  },
  reducers: {
    globalStateUpdate(state, action) {
      state.reset = action.payload.reset;
    },
  },
});

// Action creators are generated for each case reducer function
export const { globalStateUpdate } = globalState.actions;

export default globalState.reducer;
