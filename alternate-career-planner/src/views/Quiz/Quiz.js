/* Quiz.js
 * Description: Diplays the major interest quiz.
 */

import React from "react";

import './Quiz.css';
import QuizComp from './../../components/QuizComp/QuizComp';

const Quiz = () => {
    return (
        <div className='Quiz'>
            <div className='text-section'>
                <h1>Interest Quiz</h1>
                <p> Answer a few questions to find out 
                    which major is right for you. </p>
            </div>
            
            <QuizComp />
        </div>
    );
};

export default Quiz;
