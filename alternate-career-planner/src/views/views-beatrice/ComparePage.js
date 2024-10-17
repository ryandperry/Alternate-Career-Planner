// import React, { useState } from 'react';
// import React from 'react';
import './ComparePage.css';

const ComparePage = ({major = 'Mechanical Engineering'}) =>{
    return (
        <div className='ComparePage'>
            <h1>Compare with {major}</h1>
        </div>
    );
};

export default ComparePage;