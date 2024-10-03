import React from 'react';
import './App.css';
import CourseListView from './components/CourseList/CourseList';

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
      <p>Below is a test for a list of courses using dummy data. Feel free to change App.js to a homepage.</p>
      <CourseListView courses={dummyDataCourses} />

      <h1 className='alt-header'>Alternate Career Planner</h1>
      <h2 className='sec-header'>Quick Explination</h2>
      <p>         Welcome to the Alternate Career Planner, this will allow to upload your 
          completed courses and we will show you the alternate majors that you can change to. 
          You can also take a short quiz and we can give you some majors that fit the answers 
          you have given us. </p>
      <div className='quiz-div'>
      <button className='quiz-button'>Take Quiz</button>
      </div>
      <div className='upload-div'>
      <button className='upload-button'>Upload Completed Courses</button>
      </div>
    </div>
  );
}

export default App;
