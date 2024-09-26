/* MajorDetailView.js
 * Description: Provides details of a given major including
 *  a description and required courses.
 */

import React from 'react';
import './MajorDetailView.css';
import CourseListView from '../../components/CourseList/CourseList';

// Lists the details of a given major including a description and required courses
const MajorDetailView = ({ major, courses }) => {
    return (
        <div>
            <h1 className="major-title"> {major.name} </h1>
            <p className="major-description"> { major.description } </p>
            <h2> Required Courses </h2>
            <CourseListView courses = {courses}/>
        </div>
    )
}

export default MajorDetailView;