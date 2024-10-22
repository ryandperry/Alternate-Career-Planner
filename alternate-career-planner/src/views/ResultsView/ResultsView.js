/* ResultsView.js
 * Description: Displays results after the quiz is finished and provides further routs of navigating the site. 
 * This view wraps another view within the sidebar and header.
 */

import React from 'react';
import './ResultsView.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Header from '../../components/Header/Header'
import MajorsListView from '../MajorsListView/MajorsListView'

// Lists the details of a given major including a description and required courses
const ResultsView = ({ majors }) => {

    // Majors for testing until they can be passed from a datasheet
    const testMajors = [
        {
        name: 'Computer Science',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut \
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
        aliquip ex ea commodo consequat.',
        },
        {
        name: 'Mechanical Engineering',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut \
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
        name: 'Computer Engineering',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt \
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        }
    ];

    return (
        <div className='appContainerStyle'>
            <Header />
            <div className='appBodyStyle'>
                <NavigationBar majors={ majors || testMajors} />
                <body className='content-wrapper'>
                    <MajorsListView majors={majors || testMajors} /> {/* If there are no majors passed, it uses testMajors */}
                </body>
            </div>
        </div>
    )
}

export default ResultsView;