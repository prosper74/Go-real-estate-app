/* eslint-disable import/no-named-as-default */
import { combineReducers } from '@reduxjs/toolkit';

// reducer import
// import customizationReducer from './customizationReducer';
import feedbackReducer from './feedbackReducer';
import userReducer from './userReducer';
import propertyReducer from './propertyReducer';
import templateDataReducer from './templateDataReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  feedback: feedbackReducer,
  user: userReducer,
  property: propertyReducer,
  templateData: templateDataReducer,
});

export default rootReducer;
