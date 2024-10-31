import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import RealHeader from './components/RealHeader/RealHeader';
import Home from './views/Home/Home';
import Quiz from './views/Quiz/Quiz';
import ResultsView from './views/ResultsView/ResultsView';
import CourseHistoryView from './views/CourseHistoryView/CourseHistory';

function App() {
  const [courses, setCourses] = useState([]);

  const handleFileParse = (parsedCourses) => {
      setCourses(parsedCourses);
  }

  // Clear local storage when user opens website
  window.onunload = function () {
      localStorage.clear();
  }

  return (
      <Router>
          <RealHeader />

          <Routes>
              <Route path="/" element={<Home onFileParse={handleFileParse} />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results/*" element={<ResultsView />} />
              <Route path="/course_history" element={<CourseHistoryView courses={courses} />} />

          </Routes>
      </Router>
  );
}

export default App;
