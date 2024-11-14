/* CourseList.js
 * Description: Lists courses, their descriptions,
    and their hours.
 */

import React, { useEffect, useState } from 'react';
import './CourseList.css';

// Lists courses, their description, and their number of credit hours
const CourseListView = ({ courses }) => {
    const [message, setMessage] = useState(null);

    // Get data from flask server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/hello');
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    // Don't show anything (including title) if there are no courses
    if ((!courses || courses.length === 0) && !message) {
        return null;
    }

    return (
        <div>
            <h2> Required Courses </h2>
            <p>{message}</p>
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
    );
};

export default CourseListView;
