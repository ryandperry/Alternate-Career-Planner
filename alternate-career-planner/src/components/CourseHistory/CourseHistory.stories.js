import React from "react";
import '../../index.css';
import CourseHistory from "./CourseHistory";

export default {
    title: 'CourseHistory',
    component: CourseHistory,
};

const Template = (args) => <CourseHistory {...args} />

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

