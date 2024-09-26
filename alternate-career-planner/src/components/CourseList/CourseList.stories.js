import React from 'react';
import '../../index.css'; // Imports global css
import CourseListView from './CourseList';

export default {
    title: 'CourseList',
    component: CourseListView,
};

const Template = (args) => <CourseListView {...args} />

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

// A preview of a course list using dummy data
export const Default = Template.bind({});
Default.args = {
    courses: dummyDataCourses,
};

// A preview of an empty course (nothing should be displayed)
export const EmptyCourseList = Template.bind({});
EmptyCourseList.args = {
    courses: []
};