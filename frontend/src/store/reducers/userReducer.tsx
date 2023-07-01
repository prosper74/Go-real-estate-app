import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const initialState = {
  userId: 0,
  jwt: "",
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userId, jwt } = action.payload;

      // Save user details in cookies
      Cookies.set('userId', String(userId), { expires: 7 })
      Cookies.set('jwt', String(jwt), { expires: 7 })

      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
