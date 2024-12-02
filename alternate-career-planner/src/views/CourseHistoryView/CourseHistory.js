/* CourseHistory.js
 * Description: Displays the user's course history.
 */

import React, {useEffect, useState } from "react";
import './CourseHistory.css';
import CourseHistory from '../../components/CourseHistory/CourseHistory';
import TopMajors from '../../components/TopMajors/TopMajors';

const CourseHistoryView = () => {
    const [courses, setCourses] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [backendMajors, setBackendMajors] = useState([]);

    useEffect(() => {
        const storedCourses = localStorage.getItem('coursesTaken');
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        }

        const storedBackendMajors = localStorage.getItem('backendMajors');
        if (storedBackendMajors) {
          setBackendMajors(JSON.parse(storedBackendMajors));
        }
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const filteredCourses = courses.filter(course => {
        if (selectedFilter === "In Progress") {
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
                <ul className="History">
                    <li className={`Header ${selectedFilter === "All" ? 
                                                "active" : ""}`}
                        onClick={() => handleFilterChange("All")}
                    >
                        All 
                    </li>
                    <li className={`Header ${selectedFilter === "In Progress" ? 
                                                "active" : ""}`}
                        onClick={() => handleFilterChange("In Progress")}
                    >
                        In Progress 
                    </li>
                    <li className={`Header ${selectedFilter === "Completed" 
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
                <h1>Top Majors for You</h1>
                <p>
                    These majors have the most course overlap with your
                    academic history.
                </p>
                <TopMajors majors={backendMajors}/>
            </div>

        </div>
    )
}

export default CourseHistoryView;
