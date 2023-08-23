// src/reducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: {
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    },
    users: []
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setFirstName: (state, action) => {
        state.currentUser.firstName = action.payload;
      },
      setLastName: (state, action) => {
        state.currentUser.lastName = action.payload;
      },
      setEmail: (state, action) => {
        state.currentUser.email = action.payload;
      },
      setMessage: (state, action) => {
        state.currentUser.message = action.payload;
      },
      addUser: (state) => {
        state.users.push(state.currentUser);
        state.currentUser = {
          firstName: "",
          lastName: "",
          email: "",
          message: ""
        };
      },
      resetForm: (state) => {
        state.currentUser = {
          firstName: "",
          lastName: "",
          email: "",
          message: ""
        };
      }
    }
  });

  export const { 
    setFirstName, setLastName, setEmail, setMessage, addUser, resetForm 
  } = userSlice.actions;
  
  export default userSlice.reducer;
