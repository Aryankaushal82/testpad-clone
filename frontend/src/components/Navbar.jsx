
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  UserCircleIcon, 
  LogoutIcon 
} from '@heroicons/react/solid';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ totalQuestions = 0, attemptedQuestions = 0, onSubmitExam }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Load the timer value from localStorage or set a default value
    const savedTime = localStorage.getItem('examTimeLeft');
    return savedTime ? JSON.parse(savedTime) : 3600; // Default: 1 hour
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isExamPage = location.pathname.includes('/exam/');

  useEffect(() => {
    if (!isExamPage) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const updatedTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem('examTimeLeft', JSON.stringify(updatedTime)); // Save to localStorage
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [isExamPage]);

  useEffect(() => {
    if (timeLeft === 0) {
      onSubmitExam && onSubmitExam();
    }
  }, [timeLeft, onSubmitExam]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ExamPro
              </h1>
            </div>

            {isExamPage && (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">
                    Questions: {attemptedQuestions}/{totalQuestions}
                  </span>
                </div>
                <div className="bg-slate-500 text-white px-4 py-2 rounded-lg">
                  Time Left: {formatTime(timeLeft)}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
                <div>
                  <p className="text-sm font-medium dark:text-white">
                    {user?.name || 'Student'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {user?.studentId || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


