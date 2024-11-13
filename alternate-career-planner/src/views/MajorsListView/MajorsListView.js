/* MajorsListView.js
 * Description: Displays a list of similar majors for the user.
 *  This page will likely be displayed after the initial interest quiz.
 */

import React, {useEffect, useState } from 'react';
import './MajorsListView.css';
import MajorList from '../../components/MajorList/MajorList';
import { Link } from 'react-router-dom'

// Lists similar majors and their descriptions
const MajorsListView = ({ majors }) => {
    const [finalMajor, setFinalMajor] = useState(null);

    useEffect (() => {
        const storedMajor = localStorage.getItem('finalMajor');
        if (storedMajor) {
          setFinalMajor(storedMajor);
        }
    }, []);

    return (
        <div>
            <h1 className='similarMajorsHeader'> Quiz Results 🎓 </h1>
            <h2> Thanks for taking the quiz! Based on your provided answers, we think you'll enjoy: </h2>
            <p className="majorlist-item">
                <Link to={`/results/majors/${encodeURIComponent(finalMajor)}`}>
                    <h3 className="majorlist-title">{finalMajor}</h3>
                </Link>
            </p>
            <h2>Alternatively, explore all majors below. </h2>
            <MajorList majors = {majors}/>
        </div>
    )
}

export default MajorsListView;
