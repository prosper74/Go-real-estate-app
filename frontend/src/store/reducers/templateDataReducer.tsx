import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

export const templateDataReducer = createSlice({
  name: 'templateData',
  initialState,
  reducers: {
    setTemplateData: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setTemplateData } = templateDataReducer.actions;

export default templateDataReducer.reducer;
