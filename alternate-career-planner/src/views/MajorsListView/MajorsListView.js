/* MajorsListView.js
 * Description: Displays a list of similar majors for the user.
 *  This page will likely be displayed after the initial interest quiz.
 */

import React, {useEffect, useState } from 'react';
import '../MajorDetailView/MajorDetailView.css';
import MajorList from '../../components/MajorList/MajorList';
import JobsList from '../../components/JobsList/JobsList';
import MajorHeaderImage from '../../components/MajorHeaderImage/MajorHeaderImage';

// Lists similar majors and their descriptions
const MajorsListView = ({ majors }) => {
    const [finalMajor, setFinalMajor] = useState(null);

    useEffect (() => {
        const storedMajor = localStorage.getItem('finalMajor');
        if (storedMajor) {
          setFinalMajor(storedMajor);
        }
    }, []);

    const selectedMajor = majors.find((major) => major.name === finalMajor);
    const description = selectedMajor ? selectedMajor.description : "";

    return (
        <div>
            <h1 className='similarMajorsHeader'> Quiz Results 🎓 </h1>
            <h2> Thanks for taking the quiz! Based on your provided answers, we think you'll enjoy: </h2>
                <MajorHeaderImage major={{name: finalMajor || "Unknown Major"}}/>
                <h1 className="major-title">{finalMajor}</h1>
                <p className="major-description">{description}</p>
                <JobsList majorname={finalMajor}/>
            <hr className="divider" />
            <h2>Alternatively, explore all majors below. </h2>
            <MajorList majors = {majors}/>
        </div>
    )
}

export default MajorsListView;
