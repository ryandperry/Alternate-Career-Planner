/* Home.js
 * Description: Implements the webpage homescreen. Displays a brief 
 * descritpion of webpage, buttons, and tutorial.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ImageSlider from "./../../components/ImageSlider/ImageSlider";

const Home = () => {
    
    const slides = [
        {
            url: 'http://localhost:3000/image-1.jpg', 
            title: 'Step 1: In myUTK, click the My Resources Tab, and select '
                 + 'DARS and uTrack.'
        },
        {
            url: 'http://localhost:3000/image-2.jpg', 
            title: 'Step 2: Select Run Declared Programs.'
        },
        {
            url: 'http://localhost:3000/image-3.jpg', 
            title: 'Step 3: Select your audit from the Program Column.'
        },
        {
            url: 'http://localhost:3000/image-4.jpg', 
            title: 'Step 4: Navigate to the Course History tab.'
        },
        {
            url: 'http://localhost:3000/image-5.jpg', 
            title: 'Step 5: Right click the Course History table and select Save As.'
        },
        {
            url: 'http://localhost:3000/image-6.jpg', 
            title: 'Step 6: Save your academic history file as filetype WebPage'
                 + ', HTML Only.'
        }
    ];

    const containerStyles = {
        width: '921.6px',
        height: '518.4px',
        margin: '0 auto',
    };

    return (
        <div className='Home'>

            {/* Brief Description */}
            <div className='text-section'>
                <h1>We make switching majors easy.</h1>
                <p> Welcome to the Alternate Career Planner! Like 
                    engineering but hate your major? Don't worry, you've
                    come to the right place. Upload your academic 
                    history file and find majors that you could easily 
                    switch to, or take a short quiz to find out which 
                    major is right for you. </p>

                {/* Buttons */}
                <div className='buttons'>
                    <button className='upload-button'>Upload File</button>
                    <Link to='/quiz'>
                        <button className='quiz-button'>Take Quiz</button>
                    </Link>
                </div>
            </div> 

            <hr style={{ width: '100%', marginTop: '40px', marginBottom: '40px' }} />

            {/* Tutorial */}
            <h2>❓ What's an academic history file?</h2>
            <div className='tutorial-section'>
                <p>Your academic history file contains all the coures
                   you have taken at UTK. It's generated by UTK's Degree 
                   Audit Report System (DARS).</p>
            </div>

            <hr style={{ width: '100%', marginTop: '40px', marginBottom: '40px' }} />

            <div style={containerStyles}>
                <ImageSlider slides={slides}/>
            </div>

        </div>
    );
};
export default Home;
