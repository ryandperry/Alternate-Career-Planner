import React from "react";
import './CourseHistory.css'

const CourseHistory = ({ courses }) => {
    return (
        <div>
            <ul>
                {courses.map((course, index) =>(
                    <li key={index} className="CompleteCoursesList">
                        <h4 className="CourseName" >{course.class}</h4>
                        <h6 className="CourseGrade">{course.grade}</h6>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default CourseHistory;