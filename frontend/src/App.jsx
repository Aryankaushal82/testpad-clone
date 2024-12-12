// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Lazy loaded components
const Login = lazy(() => import("./pages/Login"));
const TestList = lazy(() => import("./pages/TestList"));
const QuestionPage = lazy(() => import("./pages/QuestionPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const QuestionList = lazy(() => import("./pages/QuestionList"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              // App.jsx
              <Route path="/" element={<Login />} />
              <Route path="/test-list" element={<TestList />} />
              <Route path="/exam/:testId" element={<QuestionPage />} />
              <Route path="/exam/:testId/questions" element={<QuestionList />} />
              <Route path="/exam/:testId/question/:questionId" element={<QuestionPage />} />
              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
