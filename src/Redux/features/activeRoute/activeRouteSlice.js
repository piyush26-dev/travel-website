import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "",
};

export const activeRouteSlice = createSlice({
  name: "activeRoute",
  initialState,
  reducers: {
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = activeRouteSlice.actions;
export default activeRouteSlice.reducer;
