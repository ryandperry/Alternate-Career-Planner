import React from "react";
import './HomeScreen.css';

function HomeScreen(){
    return (
        <div>
            <h1>Alternate Career Planner</h1>
            <h2>Quick Explanation</h2>
            <p>         Welcome to the Alternate Career Planner, this will allow to upload your 
                completed courses and we will show you the alternate majors that you can change to. 
                You can also take a short quiz and we can give you some majors that fit the answers 
                you have given us. </p>
            <div className='quiz-div'>
            <button className='quiz-button'>Take Quiz</button>
            </div>
            <div className='upload-div'>
            <button className='upload-button'>Upload Completed Courses</button>
            </div>
        </div>
    );
}

export default HomeScreen;