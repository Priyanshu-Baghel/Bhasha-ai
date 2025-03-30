// src/components/EditUserForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../store/auth'; // Assuming this is your AuthContext
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../Utils/Utils';

const EditUser = () => {
  const { user } = useAuth(); // Access user details from context if needed

  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
    email: user.email,
    subscription: user.subscription,
    role: user.role,
    phone: user.phone,
    id : user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.put(`http://127.0.0.1:8000/api/admin/users/${updatedUser.id}`, updatedUser);
      const response = await axios.put(SummaryApi.Admin.update.url.replace(':id', updatedUser.id), updatedUser);

      // Optionally, handle success (e.g., show a success message, redirect)
      console.log(response);
      if(response.statusText == "OK"){
        toast.success('User updated successfully');
        navigate("/admin")        
      }
      
      
    } catch (error) {
    toast.error('Error updating user:', error.msg);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email: </label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subscription: </label>
          <select
            name="subscription"
            value={updatedUser.subscription}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="active">Activate</option>
            <option value="inactive">Deactivate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role: </label>
          <select
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="admin">Admin</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number: </label>
          <input
            type="tel"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditUser;
