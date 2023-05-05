import { createSlice } from "@reduxjs/toolkit";

export const multiTabsState = createSlice({
  name: "multiTabsState",
  initialState: {
    items: [{ key: "/", label: "Home" }],
    activeKey: "/" as string,
  },
  reducers: {
    multiTabsStateAdd(state, action) {
      const { key, label } = action.payload;
      state.items.push({ key, label });
      state.activeKey = key;
    },
    multiTabsStateRemove(state, action) {
      state.items = state.items.filter((tab) => tab.key !== action.payload.key);
    },
    multiTabsStateSetActiveKey(state, action) {
      state.activeKey = action.payload.key;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  multiTabsStateAdd,
  multiTabsStateRemove,
  multiTabsStateSetActiveKey,
} = multiTabsState.actions;

export default multiTabsState.reducer;
