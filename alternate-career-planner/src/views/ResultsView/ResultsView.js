/* ResultsView.js
 * Description: Displays results after the quiz is finished and provides further routs of navigating the site. 
 * This view wraps another view within the sidebar and header.
 */

import React from 'react';
import './ResultsView.css';
// import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Header from '../../components/Header/Header'
import MajorsListView from '../MajorsListView/MajorsListView'

// Lists the details of a given major including a description and required courses
const ResultsView = ({ majors }) => {
    return (
        <div style='appContainerStyle'>
            <Header />
            <div style='appBodyStyle'>
                {/* <NavigationBar { ...majors } /> */}
                <body>
                    <MajorsListView {...majors} />
                </body>
            </div>
        </div>
    )
}

export default ResultsView;