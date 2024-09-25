import React from 'react';
import './App.css';
import CourseListView from './views/CourseList/CourseList';

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
    <div className="App">
      <h1>Hello World!</h1>
      <p>Below is a test for a list of course using dummy data. Feel free to change App.js to a homepage.</p>
      <CourseListView courses={dummyDataCourses} />
    </div>
  );
}

export default App;
