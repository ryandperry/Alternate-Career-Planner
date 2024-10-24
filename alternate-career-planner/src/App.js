import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import RealHeader from './components/RealHeader/RealHeader';
import Home from './views/Home/Home';
import Quiz from './views/Quiz/Quiz';
import ResultsView from './views/ResultsView/ResultsView';

function App() {
  // Clear local storage when user opens website
  window.onunload = function () {
      localStorage.clear();
  }

  return (
      <Router>
          <RealHeader />

          <Routes>
              {/* Initial view displaying quiz or file upload */}
              <Route path="/" element={<Home />} />

              {/* A quiz to generate suggested majors */}
              <Route path="/quiz" element={<Quiz />} />

              {/* Views including sidebar after the similar majors have been generated */}
              <Route path="/results/*" element={<ResultsView />} />

          </Routes>
      </Router>
  );
}

export default App;
