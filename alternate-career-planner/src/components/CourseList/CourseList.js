/* CourseList.js
 * Description: Lists courses, their descriptions,
    and their hours.
 */

import React from 'react';
import './CourseList.css';

// Lists courses, their description, and their number of credit hours
const CourseListView = ({ courses }) => {

    // Don't show anything (including title) if there are no courses
    if (!courses || courses.length === 0) {
        return null;
    }

    return (
        <div>
            <h2> Required Courses </h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index} className="course-item">
                        <h3>{course.name}</h3>
                        <p className="course-description">{course.description}</p>
                        <p>{course.courseHours} credit hours</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseListView;
