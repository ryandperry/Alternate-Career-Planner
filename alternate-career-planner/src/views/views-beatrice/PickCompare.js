import React, { useState } from 'react';
import './PickCompare.css';
import CourseListView from '../../components/CourseList/CourseList';
import MajorHeaderImage from '../../components/MajorHeaderImage/MajorHeaderImage';

// Lists the details of a given major including a description and required courses
const PickCompare = ({ major, courses }) => {
    const [selectedMajor, setSelectedMajor] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedMajor(event.target.value);
    };

    return (
        <div>
            <MajorHeaderImage major={major}/>
            <h1 className="major-title"> {major.name} </h1>
            <p className="major-description"> { major.description } </p>
            <h2> Required Courses </h2>
            <CourseListView courses={courses} />

            {/* "Compare with Mechanical" button */}
            <button className="compare-button">Compare with Mechanical</button>

            {/* Statement and dropdown */}
            <p>or select from the following dropdown menu:</p>
            <select className="dropdown" value={selectedMajor} onChange={handleDropdownChange}>
                <option value="">Select a major</option>
                <option value="Aerospace Engineering">Major 1</option>
                <option value="Civil Engineering">Major 2</option>
                <option value="Material Science Engineering">Major 3</option>
                <option value="Biosystems Engineering">Major 4</option>
            </select>
        </div>
    );
};

export default PickCompare;
