/* NavigationBar.js 
 * Description: Side bar to quickly navigate to other pages
 */

import React from 'react';
import './NavigationBar.css';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ majors }) => {
    const location = useLocation();

    return (
        <div className="navbar-wrapper">

            {/* My Quiz */}
            <h3 className="section-title"> My Quiz </h3>
            <ul>
                <li className="sub-nav-title"> View Results </li>
                <li className="sub-nav-title"> Retake Quiz </li>
            </ul>
            
            {/* List of Majors */}
            <h3 className="section-title"> Majors </h3>
            <ul>
                {majors.map((major) => {
                    const majorPath = `/results/majors/${encodeURIComponent(major.name)}`;
                    return (
                    <li className={`sub-nav-title ${location.pathname == majorPath ? 'isselected' : ''}`} key={major.name}>
                        <Link to={majorPath}>
                            { major.name }
                        </Link>
                    </li>
                    );
                })}
            </ul>
            
        </div>
    )
}

export default NavigationBar;