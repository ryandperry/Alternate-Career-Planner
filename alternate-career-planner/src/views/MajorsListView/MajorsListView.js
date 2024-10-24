/* MajorsListView.js
 * Description: Displays a list of similar majors for the user.
 *  This page will likely be displayed after the initial interest quiz.
 */

import React from 'react';
import './MajorsListView.css';
import MajorList from '../../components/MajorList/MajorList';
import { useLocation, Link } from 'react-router-dom'

// Lists similar majors and their descriptions
const MajorsListView = ({ majors }) => {
    // useLocation helps display quiz results from quiz component
    const location = useLocation();
    const finalMajor = location.state?.finalMajor;

    return (
        <div>
            <h1 className='similarMajorsHeader'> Quiz Results 🎓 </h1>
            <p> Thanks for taking the quiz! Based on your provided answers, we think you'll enjoy: </p>
          <p className="majorlist-item">
              <Link to={`/results/majors/${encodeURIComponent(finalMajor)}`}>
                  <h3 className="majorlist-title">{finalMajor}</h3>
              </Link>
          </p>

            <p>Alternatively, explore all majors below. </p>
            <MajorList majors = {majors}/>
        </div>
    )
}

export default MajorsListView;
