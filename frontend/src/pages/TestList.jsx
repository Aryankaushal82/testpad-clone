


// // src/pages/TestList.jsx
// import React, { useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   AcademicCapIcon, 
//   ClockIcon, 
//   DocumentTextIcon,
//   UserCircleIcon,
//   LogoutIcon,
//   BellIcon,
//   SearchIcon,
//   FilterIcon
// } from '@heroicons/react/solid';

// // Expanded list of tests with more categories
// const DUMMY_TESTS = [
//   {
//     id: 1,
//     name: "Mathematics Fundamentals",
//     description: "Comprehensive math exam covering algebra, geometry, and calculus",
//     duration: 60,
//     totalQuestions: 50,
//     difficulty: "Intermediate",
//     category: "Mathematics"
//   },
//   {
//     id: 2,
//     name: "Computer Science Basics",
//     description: "Test your knowledge of programming and computer concepts",
//     duration: 45,
//     totalQuestions: 40,
//     difficulty: "Beginner",
//     category: "Computer Science"
//   },
//   {
//     id: 3,
//     name: "General Science",
//     description: "Exam covering physics, chemistry, and biology fundamentals",
//     duration: 75,
//     totalQuestions: 60,
//     difficulty: "Advanced",
//     category: "Science"
//   },
//   {
//     id: 4,
//     name: "English Language Proficiency",
//     description: "Comprehensive test of grammar, vocabulary, and comprehension",
//     duration: 90,
//     totalQuestions: 70,
//     difficulty: "Advanced",
//     category: "Language"
//   },
//   {
//     id: 5,
//     name: "Data Structures and Algorithms",
//     description: "In-depth programming and algorithmic problem-solving",
//     duration: 60,
//     totalQuestions: 45,
//     difficulty: "Advanced",
//     category: "Computer Science"
//   },
//   {
//     id: 6,
//     name: "World History",
//     description: "Explore major historical events and civilizations",
//     duration: 75,
//     totalQuestions: 55,
//     difficulty: "Intermediate",
//     category: "History"
//   }
// ];

// const Navbar = ({ user, onLogout, onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     onSearch(value);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Left side - Logo or App Name */}
//         <div className="flex items-center">
//           <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-2" />
//           <h1 className="text-xl font-bold dark:text-white">ExamPro</h1>
//         </div>

//         {/* Center - Search Bar */}
//         <div className="flex-grow mx-4 relative">
//           <input 
//             type="text" 
//             placeholder="Search exams by name, category, or difficulty..." 
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//         </div>

//         {/* Right side - User Details and Actions */}
//         <div className="flex items-center space-x-4">
//           {/* Notifications */}
//           <div className="relative">
//             <BellIcon className="h-6 w-6 text-gray-600 dark:text-white cursor-pointer" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
//               3
//             </span>
//           </div>

//           {/* User Profile */}
//           <div className="flex items-center">
//             <UserCircleIcon className="h-8 w-8 text-blue-500 mr-2" />
//             <div>
//               <p className="font-semibold dark:text-white">{user.name}</p>
//               <p className="text-xs text-gray-500">{user.email}</p>
//             </div>
//           </div>

//           {/* Logout */}
//           <button 
//             onClick={onLogout}
//             className="bg-[#3b82f6] text-white p-[3%] rounded-full "
//           >
//             {/* <LogoutIcon className="h-6 w-6 rounded-full  " /> */}
//             logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const TestList = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [difficulty, setDifficulty] = useState('');

//   // Mock user data (replace with actual user authentication)
//   const [user] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com"
//   });

//   const handleStartTest = (testId) => {
//     navigate(`/exam/${testId}`);
//   };

//   const handleLogout = () => {
//     // Implement logout logic
//     navigate('/login');
//   };

//   // Filtered and searched tests
//   const filteredTests = useMemo(() => {
//     return DUMMY_TESTS.filter((test) => {
//       const matchesSearch = 
//         test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         test.difficulty.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesDifficulty = 
//         !difficulty || test.difficulty === difficulty;
      
//       return matchesSearch && matchesDifficulty;
//     });
//   }, [searchTerm, difficulty]);

//   return (
//     <>
//       {/* Navbar */}
//       <Navbar 
//         user={user} 
//         onLogout={handleLogout} 
//         onSearch={setSearchTerm}
//       />

//       {/* Test List */}
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold text-center mb-10 dark:text-white">
//             Available Exams
//           </h1>

//           {/* Search Results Info */}
//           {filteredTests.length === 0 ? (
//             <div className="text-center text-gray-600 dark:text-gray-300 mb-10">
//               No exams found. Try a different search term.
//             </div>
//           ) : (
//             <div className="text-center text-gray-600 dark:text-gray-300 mb-10">
//               {filteredTests.length} exam{filteredTests.length !== 1 ? 's' : ''} found
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTests.map((test) => (
//               <motion.div
//                 key={test.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center mb-4">
//                     <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-3" />
//                     <h2 className="text-xl font-bold dark:text-white">
//                       {test.name}
//                     </h2>
//                   </div>
                  
//                   <p className="text-gray-600 dark:text-gray-300 mb-4">
//                     {test.description}
//                   </p>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="flex items-center">
//                       <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
//                       <span className="dark:text-white">{test.duration} mins</span>
//                     </div>
//                     <div className="flex items-center">
//                       <DocumentTextIcon className="h-5 w-5 mr-2 text-green-500" />
//                       <span className="dark:text-white">{test.totalQuestions} Questions</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-2">
//                       <span 
//                         className={`
//                           px-3 py-1 rounded-full text-sm font-semibold
//                           ${test.difficulty === 'Beginner' 
//                             ? 'bg-green-100 text-green-800' 
//                             : test.difficulty === 'Intermediate' 
//                             ? 'bg-yellow-100 text-yellow-800' 
//                             : 'bg-red-100 text-red-800'
//                           }
//                         `}
//                       >
//                         {test.difficulty}
//                       </span>
//                       <span className="text-sm text-gray-600 dark:text-gray-300">
//                         {test.category}
//                       </span>
//                     </div>
                    
//                     <button
//                       onClick={() => handleStartTest(test.id)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                     >
//                       Start Test
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestList;

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  DocumentTextIcon,
  UserCircleIcon,
  SearchIcon
} from '@heroicons/react/solid';

// Expanded list of tests with more categories
const DUMMY_TESTS = [
  {
    id: 1,
    name: "Mathematics Fundamentals",
    description: "Comprehensive math exam covering algebra, geometry, and calculus",
    duration: 60,
    totalQuestions: 50,
    difficulty: "Intermediate",
    category: "Mathematics"
  },
  {
    id: 2,
    name: "Computer Science Basics",
    description: "Test your knowledge of programming and computer concepts",
    duration: 45,
    totalQuestions: 40,
    difficulty: "Beginner",
    category: "Computer Science"
  },
  // ... (rest of the tests remain the same)
];

const Navbar = ({ user, onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo or App Name */}
        <div className="flex items-center">
          <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold dark:text-white">ExamPro</h1>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-grow mx-4 relative">
          <input 
            type="text" 
            placeholder="Search exams by name, category, or difficulty..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        {/* Right side - User Details and Actions */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <p className="font-semibold dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className="bg-[#3b82f6] text-white px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const TestList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // Mock user data (replace with actual user authentication)
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com"
  });

  const handleStartTest = (testId) => {
    // Navigate to question list for the specific test
    navigate(`/exam/${testId}/questions`);
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  // Filtered and searched tests
  const filteredTests = useMemo(() => {
    return DUMMY_TESTS.filter((test) => {
      const matchesSearch = 
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.difficulty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = 
        !difficulty || test.difficulty === difficulty;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficulty]);

  return (
    <>
      {/* Navbar */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onSearch={setSearchTerm}
      />

      {/* Test List */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 dark:text-white">
            Available Exams
          </h1>

          {/* Search Results Info */}
          {filteredTests.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300 mb-10">
              No exams found. Try a different search term.
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300 mb-10">
              {filteredTests.length} exam{filteredTests.length !== 1 ? 's' : ''} found
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500 mr-3" />
                    <h2 className="text-xl font-bold dark:text-white">
                      {test.name}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {test.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="dark:text-white">{test.duration} mins</span>
                    </div>
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 mr-2 text-green-500" />
                      <span className="dark:text-white">{test.totalQuestions} Questions</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span 
                        className={`
                          px-3 py-1 rounded-full text-sm font-semibold
                          ${test.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : test.difficulty === 'Intermediate' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                          }
                        `}
                      >
                        {test.difficulty}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {test.category}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestList;