/* Header.js 
 * Description: Displays logo and name at the top of the page.
 */

import React from 'react';
import './Header.css';

const Header = () => {
    return (
        // Added a header wrapper to remove global padding
        <div className="header-wrapper">
            <header>
                <div className ="titleRow">
                    <img src={'/assets/logo.png'} alt="Alternate Career Planner Logo" className="logo"/>
                    <h1> Alternate Career Planner </h1>
                </div>
            </header>
        </div>
    )
}

export default Header;
