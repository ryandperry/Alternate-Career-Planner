import React from "react";
import './CourseHistory.css'

const CourseHistory = ({ courses }) => {
    return (
        <div>
            <table>
                {courses.map((course, index) =>(
                    <><tr key={index} className="CompletedCoursesList">
                            <th className="CourseName">{course.class}</th>
                            <th className="CourseGrade">{course.grade}</th>
                        </tr></>
                ))}
            </table>
        </div>

    )
}

export default CourseHistory;