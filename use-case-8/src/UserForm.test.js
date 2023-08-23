import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer'; // Assuming the reducer is exported from this file
import UserForm from './UserForm';
import '@testing-library/jest-dom';

// Mock store
const store = createStore(reducer);

const renderWithRedux = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

describe('UserForm', () => {
  test('renders form with correct fields', () => {
    renderWithRedux(<UserForm />);
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('displays validation error for first name when length < 2', () => {
    renderWithRedux(<UserForm />);
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'A' },
    });
    
    expect(screen.getByText('Must be at least 2 characters')).toBeInTheDocument();
  });

  test('displays validation error for email when it is invalid', () => {
    renderWithRedux(<UserForm />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' },
    });
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  test('displays validation error for message when length < 10', () => {
    renderWithRedux(<UserForm />);
    fireEvent.change(screen.getByPlaceholderText('Message'), {
      target: { value: 'Short' },
    });
    
    expect(screen.getByText('Must be at least 10 characters')).toBeInTheDocument();
  });

  test('disables submit button when form is invalid', () => {
    renderWithRedux(<UserForm />);
    expect(screen.getByText('Submit')).toBeDisabled();
  });
});
