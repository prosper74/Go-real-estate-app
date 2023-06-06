import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

export const propertyReducer = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setProperties } = propertyReducer.actions;

export default propertyReducer.reducer;
