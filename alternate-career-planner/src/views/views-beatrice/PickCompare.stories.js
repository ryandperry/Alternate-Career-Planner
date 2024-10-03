import React from 'react';
import '../../index.css'; // Imports global css
import PickCompare from './PickCompare';

export default {
    title: 'PickCompare',
    component: PickCompare,
};

const Template = (args) => <PickCompare {...args} />;

// Test data for a list of courses
const dummyDataCourses = [
    {
        name: 'COSC 101',
        description: `An introduction to computational thinking and structured programming.`,
        courseHours: 4,
    },
    {
        name: 'COSC 102',
        description: `Modular programming in an object-oriented programming language, including string and vector manipulation, and file I/O, bit operators.`,
        courseHours: 4,
    },
    {
        name: 'COSC 202',
        description: `Design, analysis, and implementation of fundamental data structures and algorithms including lists, stacks, queues, hash tables, binary search trees and heaps.`,
        courseHours: 4,
    }
];

// Test data for a major and its description
const dummyMajor = {
    name: 'Interest Quiz Results',
    description: `Thank you for taking our interest quiz! Due to the answers you provided, we were able to determine the ideal path forward for you. Your results show that this path is:           Mechanical!!!`,
};

const genericMajor = {
    name: 'Generic Major',
    description: `This is a generic major. It is a long-established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it 
    has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here,' making 
    it look like readable English.`,
};

// A preview of a major's details using dummy data
export const ComputerScience = Template.bind({});
ComputerScience.args = {
    major: dummyMajor,
    courses: dummyDataCourses,
};

export const GenericName = Template.bind({});
GenericName.args = {
    major: genericMajor,
    courses: dummyDataCourses,
};
