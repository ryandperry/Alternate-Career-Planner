import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import RealHeader from './components/RealHeader/RealHeader';
import Home from './views/Home/Home';
import Quiz from './views/Quiz/Quiz';

function App() {

  // Dummy data for the course list. This will be removed later.
  const dummyDataCourses = [
    {
      name: 'COSC 101',
      description: 'An introduction to computational thinking and structured programming.',
      courseHours: 4
    },
    {
      name: 'COSC 102',
      description: 'Modular programming in an object-oriented programming language, including string and vector manipulation, and file I/O, bit operators.',
      courseHours: 4
    },
    {
      name: 'COSC 202',
      description: 'Design, analysis, and implementation of fundamental data structures and algorithms including lists, stacks, queues, hash tables, binary search trees and heaps.',
      courseHours: 4
    }
  ];

  return (
      <Router>
          <RealHeader />

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
          </Routes>
      </Router>
  );
}

export default App;
