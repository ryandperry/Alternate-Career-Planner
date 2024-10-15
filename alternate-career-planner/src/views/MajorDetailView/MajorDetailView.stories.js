import React from 'react';
import '../../index.css'; // Imports global css
import MajorDetailView from './MajorDetailView';
import { Default as Header } from '../../components/Header/Header.stories'; // Import Header
import { Default as NavigationBar } from '../../components/NavigationBar/NavigationBar.stories'; // Import Navigation Bar

export default {
    title: 'MajorDetailView',
    component: MajorDetailView,
};

const Template = (args) => <MajorDetailView {...args} />

// Test data of a list of courses
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

// Test data for a major and its description
const dummyMajor = {
    name: 'Computer Science',
    description: 'Computer Science is the systematic study of algorithmic processes that describe ' +
     'and transform information: their theory, analysis, design, efficiency, implementation, ' +
     'and application. The fundamental question underlying all of computing is: What can efficiently be automated?\n\n' +
     'Computer Science is far more than programming. It incorporates the paradigms of theory (mathematical), ' +
     'abstraction (experimental), and design (engineering) within many topic areas.',
};

// Test data for a generic major showing a generic photo
const genericMajor = {
  name: 'Generic Major',
  description: 'This is a generic major. It is a long established fact that a reader will be distracted ' +
   'by the readable content of a page when looking at its layout. \n\nThe point of using Lorem Ipsum is that it ' +
   'has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making ' +
   'it look like readable English.',
};

// Styling to include navigation bar 

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const appBodyStyle = {
  display: 'flex',
  flex: 1,
};

const contentStyle = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#f0f0f0',
  overflowY: 'auto',
  margin: 0,
};

// Dummy majors for nav bar
const dummyMajors = [
  { name: 'Computer Science' },
  { name: 'Electrical Engineering' },
  { name: 'Computer Engineering' },
  { name: 'Mechanical Engineering' },
  { name: 'Environmental Engineering' },
];


// A preview of a major's details using dummy data
export const ComputerScienceWithHeader = (args) => (
  <div style={appContainerStyle}>
    <Header />
    <div style={appBodyStyle}>
      <NavigationBar {...args} />
      <body>
        <MajorDetailView style={contentStyle} {...args} />
      </body>
    </div>
  </div>
);
ComputerScienceWithHeader.args = {
    major: dummyMajor,
    courses: dummyDataCourses,
    majors: dummyMajors
};

export const GenericName = Template.bind({});
GenericName.args = {
    major: genericMajor,
    courses: dummyDataCourses,
};