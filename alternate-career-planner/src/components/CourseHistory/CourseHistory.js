import React from "react";
import './CourseHistory.css'

const CourseHistory = ({ courses }) => {
    return (
    <div>
        <table>
            <tbody>
                {courses.map((course, index) =>(
                    <tr key={index}>
                        <td className="CourseDetails">
                            <span className="CourseName">
                                {course.title}
                            </span>
                            <span className="CourseGrade">
                                {course.grade}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    )
}

export default CourseHistory;
