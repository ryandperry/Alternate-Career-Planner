/* NavigationBar.js 
 * Description: Side bar to quickly navigate to other pages
 */

import React from 'react';
import './NavigationBar.css';

const NavigationBar = ({ majors }) => {
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
                {majors.map((major) => (
                    <li className="sub-nav-title">
                        { major.name }
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default NavigationBar;