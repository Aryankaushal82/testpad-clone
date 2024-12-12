import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/solid';
import Navbar from '../components/Navbar';
import { EXAM_QUESTIONS } from '../data/examQuestions';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract results from location state
  const { testId, results } = location.state || {};
  const questions = EXAM_QUESTIONS[testId] || [];

  // Calculate score
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (results.selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return {
      correctAnswers,
      totalQuestions: questions.length,
      percentage: ((correctAnswers / questions.length) * 100).toFixed(2)
    };
  };

  const scoreDetails = calculateScore();

  const renderResultDetails = () => {
    return questions.map(question => {
      const selectedAnswer = results.selectedAnswers[question.id];
      const isCorrect = selectedAnswer === question.correctAnswer;

      return (
        <div 
          key={question.id} 
          className={`
            p-4 rounded-lg mb-4 
            ${isCorrect 
              ? 'bg-green-100 dark:bg-green-900' 
              : 'bg-red-100 dark:bg-red-900'}
          `}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold dark:text-white">
              Question {question.id}
            </h3>
            {isCorrect ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
          <p className="mt-2 dark:text-gray-200">{question.text}</p>
          <div className="mt-4">
            <p className="font-medium">Your Answer: 
              <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                {` ${selectedAnswer}`}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Correct Answer: {question.correctAnswer}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <AcademicCapIcon className="h-16 w-16 mx-auto text-blue-500" />
              <h1 className="text-3xl font-bold mt-4 dark:text-white">
                Exam Result
              </h1>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Total Questions</p>
                  <p className="text-2xl font-bold dark:text-white">
                    {scoreDetails.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {scoreDetails.correctAnswers}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Percentage</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {scoreDetails.percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Detailed Results
              </h2>
              {renderResultDetails()}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/test-list')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Back to Test List
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;