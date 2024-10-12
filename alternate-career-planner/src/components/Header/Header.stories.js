import React from 'react';
import '../../index.css'; // Imports global css
import Header from './Header';

export default {
    title: 'Header',
    component: Header,
};

const Template = (args) => <Header {...args} />

export const Default = Template.bind({});