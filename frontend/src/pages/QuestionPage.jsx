import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { EXAM_QUESTIONS } from "../data/examQuestions";

const QuestionPage = () => {
  const { testId, questionId } = useParams();
  const navigate = useNavigate();

  // Get questions for the specific test
  const questions = EXAM_QUESTIONS[testId];

  // Find current question index
  const currentQuestionIndex = questions.findIndex(
    (q) => q.id === parseInt(questionId)
  );

  // State management
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(() => {
    // Retrieve remaining time from localStorage
    const savedTime = localStorage.getItem(`exam_${testId}_time`);
    return savedTime ? parseInt(savedTime) : 3600;
  });

  // Load saved state on component mount
  useEffect(() => {
    // Load saved answers
    const savedAnswers = localStorage.getItem(`exam_${testId}_answers`);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    // Load saved question status
    const savedStatus = localStorage.getItem(`exam_${testId}_status`);
    if (savedStatus) {
      setQuestionStatus(JSON.parse(savedStatus));
    }
  }, [testId]);

  // Save answers to localStorage
  const saveAnswersToLocalStorage = useCallback(
    (answers) => {
      localStorage.setItem(`exam_${testId}_answers`, JSON.stringify(answers));
    },
    [testId]
  );

  // Save question status to localStorage
  const saveQuestionStatusToLocalStorage = useCallback(
    (status) => {
      localStorage.setItem(`exam_${testId}_status`, JSON.stringify(status));
    },
    [testId]
  );

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: option,
    };
    setSelectedAnswers(newAnswers);
    saveAnswersToLocalStorage(newAnswers);
  };

  // Submit current question
  const handleSubmitAnswer = (status = "attempted") => {
    const currentQuestion = questions[currentQuestionIndex];
    const newStatus = {
      ...questionStatus,
      [currentQuestion.id]: status,
    };
    setQuestionStatus(newStatus);
    saveQuestionStatusToLocalStorage(newStatus);
  };

  // Navigation handlers
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      navigate(`/exam/${testId}/question/${prevQuestion.id}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      navigate(`/exam/${testId}/question/${nextQuestion.id}`);
    }
  };

  // Submit exam
  const handleSubmitExam = () => {
    navigate("/result", {
      state: {
        testId,
        results: {
          selectedAnswers,
          questionStatus,
        },
      },
    });
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar
        totalQuestions={questions.length}
        attemptedQuestions={Object.keys(questionStatus).length}
        onSubmitExam={handleSubmitExam}
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 px-4 ">
        <div className="container rounded-lg  pb-2 mx-auto grid grid-cols-1 md:grid-cols-10 gap-6 h-[calc(100vh-5rem)]">
          {/* Question Navigation Sidebar */}
          <div className=" min-h-full overflow-y-hidden">
            <div className="grid grid-cols-10 md:grid-cols-1 gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md px-4 w-full h-[50%] md:min-h-screen md:w-auto transform-translate-x-[-50%] overflow-x-scroll overflow-y-hidden md:overflow-x-hidden md:h-screen md:overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ">
              <div className=" flex flex-row  items-center justify-start gap-3 md:flex-col md:items-center md:justify-start">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => navigate(`/exam/${testId}/question/${q.id}`)}
                    className={`
                       w-10 h-10 rounded-full flex items-center justify-center p-[16px]
                      ${currentQuestion.id === q.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600'}
                      ${questionStatus[q.id] === 'attempted' 
                        ? 'bg-green-500 text-white' 
                        : questionStatus[q.id] === 'reviewed' 
                        ? 'bg-yellow-500 text-white' 
                        : ''}
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div> 
          </div>

          {/* Main Question Area */}
          <div className="grid grid-cols-1 md:col-start-2 md:col-end-11 h-full">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col"
            >
              {/* Question Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                {/* <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Time Remaining: {formatTime(timeRemaining)}
                  </span>
                </div> */}
              </div>

              {/* Question Content */}
              <div className="flex-grow">
                <p className="text-lg mb-6 dark:text-gray-200">
                  {currentQuestion.text}
                </p>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`
                        p-4 border rounded-lg cursor-pointer transition
                        ${
                          selectedAnswers[currentQuestion.id] === option
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }
                      `}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          checked={
                            selectedAnswers[currentQuestion.id] === option
                          }
                          onChange={() => {}}
                          className="mr-3"
                        />
                        <span className="dark:text-white">{option}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Navigation and Submit Buttons */}
              <div className="mt-6 flex justify-between">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={() => navigate(`/exam/${testId}/questions`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  View All Questions
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Submit Exam
                  </button>
                )}
              </div>

              {/* Submit and Review Buttons */}
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleSubmitAnswer("attempted")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Mark as Attempted
                </button>
                <button
                  onClick={() => handleSubmitAnswer("reviewed")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Mark for Review
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
