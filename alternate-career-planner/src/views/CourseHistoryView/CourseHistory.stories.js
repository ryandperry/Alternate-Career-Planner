import React from "react";
import '../../index.css';
import CourseHistoryView from './CourseHistory';
export default {
    title: 'CourseHistoryView',
    component: CourseHistoryView,
};

const Template = (args) => <CourseHistoryView {...args} />

//Test data to create the course history page
const CourseHistoryList = [
    {
        class: 'BME 205',
        grade: 'A',
    }, 
    {
        class: 'BME 474',
        grade: 'B',
    }, 
    {
        class: 'EF 151',
        grade: 'B-',
    }
];

export const Default = Template.bind({});
Default.args = {
    courses: CourseHistoryList,
};

