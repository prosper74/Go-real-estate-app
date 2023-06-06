import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

export const propertyReducer = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperty: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setProperty } = propertyReducer.actions;

export default propertyReducer.reducer;
