// src/reducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetForm: (state) => {
        return initialState;
    }
  }
});

export const { setFirstName, setLastName, setEmail, setMessage, resetForm } = userSlice.actions;
export default userSlice.reducer;
