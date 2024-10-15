import React from 'react';
import '../../index.css'; // Imports global css
import NavigationBar from './NavigationBar';
import { Default as Header } from '../../components/Header/Header.stories'; // Import Header

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

export const NavBarWithHeader = (args) => (
    <div>
    <Header />
    <NavigationBar {...args} />
  </div>
);
NavBarWithHeader.args = {
    majors: dummyMajors
};