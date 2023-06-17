/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userId: 0,
  jwt: '',
  onboarding: false,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
