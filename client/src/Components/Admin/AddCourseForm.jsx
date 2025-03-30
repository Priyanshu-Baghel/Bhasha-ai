// AddCourseForm.js

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../../Utils/Utils';

const AddCourseForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        course_name: '',
        course_description: '',
        language: '',
        platform: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.Admin.addCourse.url, {
                method: SummaryApi.Admin.addCourse.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else{
                const data = await response.json();
                toast(data.msg); 
                setFormData({
                    course_name: '',
                    course_description: '',
                    language: '',
                    platform: ''
                });
                navigate("/admin");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add course'); // Show error message
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="course_name" className="block text-sm font-medium text-gray-700">Course Name:</label>
                    <input type="text" id="course_name" name="course_name" value={formData.course_name} onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="course_description" className="block text-sm font-medium text-gray-700">Course Description:</label>
                    <textarea id="course_description" name="course_description" value={formData.course_description} onChange={handleChange} rows="3" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language:</label>
                    <input type="text" id="language" name="language" value={formData.language} onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform:</label>
                    <input type="text" id="platform" name="platform" value={formData.platform} onChange={handleChange} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <button type="submit" className="w-full bg-black hover:bg-grey-300 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-400 focus:ring-opacity-50">Add Course</button>
                </div>
            </form>
        </div>
    );
};

export default AddCourseForm;
