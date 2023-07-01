import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const defaultUser = { username: 'Guest' };
let getStoredUser;
const getUserInCookie = () => {
  if (typeof window !== 'undefined') {
    let currentUser = Cookies.get('user');
    getStoredUser = currentUser ? JSON.parse(currentUser) : {};
    return getStoredUser;
  }
};

const storedUser = getUserInCookie();
const initialState = storedUser || defaultUser;

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      let newState = { ...state };
      if (action.payload.username === 'Guest') {
        typeof window !== 'undefined' && Cookies.remove('user');
      } else {
        typeof window !== 'undefined' &&
          Cookies.set('user', JSON.stringify(action.payload));
      }

      newState = action.payload;
      return newState;
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
