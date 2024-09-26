import React from 'react';
import '../../index.css'; // Imports global css
import MajorDetailView from './MajorDetailView';

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

// A preview of a major's details using dummy data
export const Default = Template.bind({});
Default.args = {
    major: dummyMajor,
    courses: dummyDataCourses,
};