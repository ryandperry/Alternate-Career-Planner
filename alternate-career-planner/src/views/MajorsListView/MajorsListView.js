/* MajorsListView.js
 * Description: Displays a list of similar majors for the user.
 *  This page will likely be displayed after the initial interest quiz.
 */

import React from 'react';
import './MajorsListView.css';
import MajorList from '../../components/MajorList/MajorList';

// Lists similar majors and their descriptions
const MajorsListView = ({ majors }) => {
    return (
        <div>
            <h1 className='similarMajorsHeader'> Similar Majors 🎓 </h1>
            <p> Thanks for taking the interest quiz! Below are some majors that we think you'll enjoy. </p>
            <MajorList majors = {majors}/>
        </div>
    )
}

export default MajorsListView;