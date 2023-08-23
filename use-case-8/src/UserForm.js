import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { setFirstName, setLastName, setEmail, setMessage, resetForm } from './reducer';

const UserForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state);  // get the user data from Redux store

  // Local state for form errors
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const isFormValid = () => {
    return !Object.values(formErrors).some(error => error) &&
           Object.values(userData).every(data => data);
  };

  const handleChange = (e, setFunc) => {
    const { value } = e.target;
    dispatch(setFunc(value));  // using the action to set individual field data
    validateField(e.target.name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case 'firstName':
      case 'lastName':
        errors[name] = !validator.isLength(value, { min: 2 }) ? 'Must be at least 2 characters' : '';
        break;
      case 'email':
        errors[name] = !validator.isEmail(value) ? 'Invalid email address' : '';
        break;
      case 'message':
        errors[name] = !validator.isLength(value, { min: 10 }) ? 'Must be at least 10 characters' : '';
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Submitted data:', userData); // Do something with the data
      dispatch(resetForm()); // Resetting the form data in the store
      setFormErrors({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={userData.firstName} onChange={(e) => handleChange(e, setFirstName)} placeholder="First Name" />
      {formErrors.firstName && <span>{formErrors.firstName}</span>}

      <input type="text" name="lastName" value={userData.lastName} onChange={(e) => handleChange(e, setLastName)} placeholder="Last Name" />
      {formErrors.lastName && <span>{formErrors.lastName}</span>}

      <input type="email" name="email" value={userData.email} onChange={(e) => handleChange(e, setEmail)} placeholder="Email" />
      {formErrors.email && <span>{formErrors.email}</span>}

      <textarea name="message" value={userData.message} onChange={(e) => handleChange(e, setMessage)} placeholder="Message"></textarea>
      {formErrors.message && <span>{formErrors.message}</span>}

      <button type="submit" disabled={!isFormValid()}>Submit</button>
    </form>
  );
};

export default UserForm;
