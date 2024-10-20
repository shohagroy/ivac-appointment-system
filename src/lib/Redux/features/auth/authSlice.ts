import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as User,
  allUsers: [] as User[],
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

    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setLoggedInUser, setAllUsers } = authSlice.actions;

export default authSlice.reducer;
