import React, {useEffect, useState } from "react";
import './CourseHistory.css';
import CourseHistory from '../../components/CourseHistory/CourseHistory';

const CourseHistoryView = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const storedCourses = localStorage.getItem('coursesTaken');
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        }
    }, []);

    return (
        <div>
            <h1 className="Header"> List of completed courses </h1>
            <table className="WholeTable">
                <tr>
                    <th className="CourseHeader">Course Name</th>
                    <th className="GradeHeader">Course Grade</th>
                </tr>
                <tr>
                    <th colSpan={2}><CourseHistory courses = {courses}/></th>
                </tr>
            </table>
        </div>
    )
}

export default CourseHistoryView;
