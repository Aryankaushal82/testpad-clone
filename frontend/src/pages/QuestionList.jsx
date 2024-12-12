
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon, EyeIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import Navbar from '../components/Navbar';
import { EXAM_QUESTIONS } from '../data/examQuestions';

const QuestionList = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const questions = EXAM_QUESTIONS[testId];

  // State to track question status
  const [questionStatus, setQuestionStatus] = useState({});

  // Load saved status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem(`exam_${testId}_status`);
    if (savedStatus) {
      setQuestionStatus(JSON.parse(savedStatus));
    }
  }, [testId]);

  // Render status icon
  const renderStatusIcon = (questionId) => {
    const status = questionStatus[questionId];
    switch (status) {
      case 'attempted':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'reviewed':
        return <EyeIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  // Get status text
  const getStatusText = (questionId) => {
    const status = questionStatus[questionId];
    switch (status) {
      case 'attempted': return 'Attempted';
      case 'reviewed': return 'Reviewed';
      default: return 'Not Attempted';
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault;
    
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 px-4 ">
        <div className="container mx-auto py-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Question Palette
          </h2>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                onClick={() => navigate(`/exam/${testId}/question/${question.id}`)}
                className={`
                  p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer
                  flex items-center justify-between
                  ${questionStatus[question.id] === 'attempted' 
                    ? 'border-l-4 border-green-500' 
                    : questionStatus[question.id] === 'reviewed' 
                    ? 'border-l-4 border-yellow-500' 
                    : ''}
                `}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium dark:text-white">
                    Question {index + 1}
                  </span>
                  {renderStatusIcon(question.id)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {getStatusText(question.id)}
                </span>
              </div>
            ))}
          </div>
          <button className='bg-blue-500 w-full p-4 my-4 rounded-lg text-white text-xl hover:bg-blue-600' onClick={handleSubmit}>submit Exam</button>
        </div>
      </div>
    </>
  );
};

export default QuestionList;