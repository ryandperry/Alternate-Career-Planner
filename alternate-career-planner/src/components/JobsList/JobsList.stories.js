import React from 'react';
import '../../index.css'; // Imports global css
import JobsList from './JobsList';

export default {
    title: 'JobsList',
    component: JobsList,
};

const dummyMajor = {
    name: 'Computer Science',
    description: 'Computer Science is the systematic study of algorithmic processes that describe ' +
     'and transform information: their theory, analysis, design, efficiency, implementation, ' +
     'and application. The fundamental question underlying all of computing is: What can efficiently be automated?\n\n' +
     'Computer Science is far more than programming. It incorporates the paradigms of theory (mathematical), ' +
     'abstraction (experimental), and design (engineering) within many topic areas.',
};

const Template = (args) => <JobsList {...args} />

// A preview of a career list for comp sci
export const CompSciJobs = Template.bind({});
CompSciJobs.args = {
    majorname: 'Computer Science'
};

// A preview of a career list for mechanical engineering
export const BiomedicalJobs = Template.bind({});
BiomedicalJobs.args = {
    majorname: 'Biomedical Engineering'
};