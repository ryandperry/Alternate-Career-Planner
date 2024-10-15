import React from 'react';
import '../../index.css'; // Imports global css
import NavigationBar from './NavigationBar';

export default {
    title: 'NavigationBar',
    component: NavigationBar,
};

const dummyMajors = [
    { name: 'Computer Science' },
    { name: 'Electrical Engineering' },
    { name: 'Computer Engineering' },
    { name: 'Mechanical Engineering' },
    { name: 'Environmental Engineering' },
];

const Template = (args) => <NavigationBar {...args} />

export const Default = Template.bind({});
Default.args = {
    majors: dummyMajors
};