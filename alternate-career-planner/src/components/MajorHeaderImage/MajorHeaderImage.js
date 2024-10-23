/* MajorHeaderImage.js
 * Image header for a major (used in MajorDetailView)
 */

import React from 'react';
import './MajorHeaderImage.css';

// Map header images to major names
// Images from UTK major pages
const imageMap = {
    'Computer Science': '/assets/major-header-images/computer-science-header.jpg',
    'Computer Engineering': '/assets/major-header-images/computer-science-header.jpg',
    'Electrical Engineering': '/assets/major-header-images/electrical-engineering-header.jpg',
    'Mechanical Engineering': '/assets/major-header-images/mech-engineering-header.jpg',
    'Biomedical Engineering': '/assets/major-header-images/biomedical-header.jpg',
    'Aerospace Engineering': '/assets/major-header-images/aerospace-header.jpg',
    'Chemical Engineering': '/assets/major-header-images/chemical-eng-header.jpg',
    'Civil Engineering': '/assets/major-header-images/civil-eng-header.jpg',
    'Environmental Engineering': '/assets/major-header-images/environmental-eng-header.jpg',
    'Materials Science and Engineering': '/assets/major-header-images/mse-header.jpg',
};

// Returns a header image
const MajorHeaderImage = ({ major }) => {
    // Return a generic header image if there is not one for that major
    const imageURL = imageMap[major.name] || '/assets/major-header-images/generic-header-image.jpg';

    return (
        <header className="header-image">
            <img
             src={imageURL}
             alt={major.name}
            />
        </header>
    );
};

export default MajorHeaderImage;