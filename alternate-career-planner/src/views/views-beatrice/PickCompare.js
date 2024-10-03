import React, { useState } from 'react';
import './PickCompare.css';
// import CourseListView from '../../components/CourseList/CourseList';
//import MajorHeaderImage from '../../components/MajorHeaderImage/MajorHeaderImage';

// Lists the details of a given major including a description and required courses
const PickCompare = ({ major, courses }) => {
    const [selectedMajor, setSelectedMajor] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedMajor(event.target.value);
    };

    return (
        <div>
            <h1 className="major-title"> {major.name} </h1>
            <p className="major-description"> { major.description } </p> 

            {/* "Compare with Mechanical" button */}
            <button className="compare-button">Compare with Mechanical</button>

            {/* Statement and dropdown */}
            <p>Or select from the following dropdown menu:</p>
            <select className="dropdown" value={selectedMajor} onChange={handleDropdownChange}>
                <option value="">Select a major</option>
                <option value="Aerospace Engineering">Aerospace Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Material Science Engineering">Material Science</option>
                <option value="Biosystems Engineering">Biosystems Engineering</option>
            </select>
        </div>
    );
};

export default PickCompare;
