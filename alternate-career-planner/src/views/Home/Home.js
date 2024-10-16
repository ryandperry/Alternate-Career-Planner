import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
    return (
        <div className='Home'>
            <div className='text-section'>
                <h1>We make switching majors easy.</h1>
                <p> Welcome to the Alternate Career Planner! Like engineering
                    but hate your major? Don't worry, you've come to the 
                    right place. Upload your academic history file and find 
                    majors that you could easily switch to, or take a short
                    quiz to find out which major is right for you. </p>
                <div className='buttons'>
                    <button className='upload-button'>Upload File</button>
                    <Link to='/quiz'>
                        <button className='quiz-button'>Take Quiz</button>
                    </Link>
                </div>
            </div> 
        </div>
    );
};
export default Home;
