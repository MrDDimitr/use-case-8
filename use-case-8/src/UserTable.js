import React from 'react';
import { useSelector } from 'react-redux';

function UserTable() {
  const users = useSelector(state => state.users); // Updated the state to select the users array

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={`${user.firstName}-${user.lastName}-${user.email}`}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;