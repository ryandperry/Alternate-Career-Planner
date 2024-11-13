/* CourseHistory.js
 * Description: Displays the user's course history.
 */

import React, {useEffect, useState } from "react";
import './CourseHistory.css';
import CourseHistory from '../../components/CourseHistory/CourseHistory';

const CourseHistoryView = () => {
    const [courses, setCourses] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("All");

    useEffect(() => {
        const storedCourses = localStorage.getItem('coursesTaken');
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        }
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const filteredCourses = courses.filter(course => {
        if (selectedFilter === "Active") {
          return course.grade === "IP";
        } else if (selectedFilter === "Completed") {
          return course.grade !== "IP";
        }
        return true;
    });

    return (
        <div className="Split">
            <div className="Sidebar">
                <h1 className="Title">Courses</h1>
                <ul>
                    <li className="Header"
                        className={`Header ${selectedFilter === "All" ? 
                                                "active" : ""}`}
                        onClick={() => handleFilterChange("All")}
                    >
                        All 
                    </li>
                    <li className="Header"
                        className={`Header ${selectedFilter === "Active" ? 
                                                "active" : ""}`}
                        onClick={() => handleFilterChange("Active")}
                    >
                        Active 
                    </li>
                    <li className="Header"
                        className={`Header ${selectedFilter === "Completed" 
                                                ? "active" : ""}`}
                        onClick={() => handleFilterChange("Completed")}
                    >
                        Completed 
                    </li>
                </ul>
                <table>
                    <th colSpan={2}>
                        <CourseHistory courses = {filteredCourses}/>
                    </th>
                </table>
            </div>

            <div className="mainContent">
                <h1>MAIN CONTENT</h1>
            </div>

        </div>
    )
}

export default CourseHistoryView;
