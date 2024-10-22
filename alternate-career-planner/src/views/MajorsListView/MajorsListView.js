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
            <h1 className='similarMajorsHeader'> Quiz Results 🎓 </h1>
            <p> Thanks for taking the quiz! Based on your provided answers, we've selected the following majors that we think you'll enjoy. Alternatively, explore all majors below. </p>
            <MajorList majors = {majors}/>
        </div>
    )
}

export default MajorsListView;