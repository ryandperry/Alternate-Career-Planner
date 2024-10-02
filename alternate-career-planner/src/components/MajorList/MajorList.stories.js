import React from 'react';
import '../../index.css'; // Imports global css
import MajorList from './MajorList';

export default {
    title: 'MajorList',
    component: MajorList,
};

const Template = (args) => <MajorList {...args} />

// Test data of a list of majors
const testMajors = [
    {
      name: 'Computer Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut \
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat.',
    },
    {
      name: 'Mechanical Engineering',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut \
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      name: 'Computer Engineering',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt \
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    }
];

// A preview of a course list using dummy data
export const Default = Template.bind({});
Default.args = {
    majors: testMajors,
};