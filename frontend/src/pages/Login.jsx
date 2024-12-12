// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LockClosedIcon, UserIcon, AcademicCapIcon } from "@heroicons/react/solid";

// Predefined Credentials
const VALID_CREDENTIALS = [
  {
    username: 'student1',
    password: 'exam2024',
    testCode: 'MATH001',
    name: 'John Doe',
    studentId: 'STD001'
  },
  {
    username: 'student2',
    password: 'exam2024',
    testCode: 'CS001',
    name: 'Jane Smith',
    studentId: 'STD002'
  },
  {
    username: 'student3',
    password: 'exam2024',
    testCode: 'SCIENCE001',
    name: 'Mike Johnson',
    studentId: 'STD003'
  }
];

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    testCode: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!formData.username) {
      setError('Username is required');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    if (!formData.testCode) {
      setError('Test Code is required');
      return;
    }

    // Find matching credentials
    const matchedUser = VALID_CREDENTIALS.find(
      user => 
        user.username === formData.username && 
        user.password === formData.password && 
        user.testCode === formData.testCode
    );

    if (matchedUser) {
      // Successful login
      login({
        name: matchedUser.name,
        studentId: matchedUser.studentId,
        username: matchedUser.username,
        testCode: matchedUser.testCode
      });
      navigate('/test-list');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Function to auto-fill credentials
  const autoFillCredentials = (index) => {
    const user = VALID_CREDENTIALS[index];
    setFormData({
      username: user.username,
      password: user.password,
      testCode: user.testCode
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <AcademicCapIcon className="mx-auto h-16 w-16 text-blue-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            Exam Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Secure Online Examination System
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Test Code Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AcademicCapIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Test Code"
              value={formData.testCode}
              onChange={(e) => setFormData({...formData, testCode: e.target.value})}
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Quick Login Options */}
          <div className="flex justify-between space-x-2">
            {VALID_CREDENTIALS.map((user, index) => (
              <button
                key={user.username}
                type="button"
                onClick={() => autoFillCredentials(index)}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                User {index + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Start Exam
          </motion.button>
        </form>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hint: Use the quick login buttons to auto-fill credentials
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;