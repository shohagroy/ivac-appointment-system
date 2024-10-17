import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
};

const authSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },

    setAuthToken: (state, action) => {
      const token = action.payload;
      if (token) {
      }
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
