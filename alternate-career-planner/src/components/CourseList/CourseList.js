/* CourseList.js
 * Description: Lists courses, their descriptions,
    and their hours.
 */

import React, { useEffect, useState } from 'react';
import './CourseList.css';

// Lists courses, their description, and their number of credit hours
const CourseListView = ({ major }) => {
    const [resultsJSON, setResultsJSON] = useState([]);  // Initialize as an empty array

    // Get data from Flask server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/RyanData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'Computer Science': 'coursename',  // Send the major name to the server
                    }),
                });
    
                if (!response.ok) throw new Error('Network response was not ok');
    
                const data = await response.json();
                setResultsJSON(data);  // Assuming the server returns a list of majors with courses
    
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
    
        fetchData();
    }, []);

    // Find courses for the selected major
    const majorCourses = resultsJSON.find(item => item.major_name === major);

    // Don't show anything if no courses are found for the major
    if (!majorCourses || !majorCourses.courses) {
        return null;
    }

    return (
        <div>
            <h2> Courses for {major} </h2>
            <ul>
                {majorCourses.courses.map((course, index) => (
                    <li key={index} className="course-item">
                        <h3>{course.course_name.join(", ")}</h3>
                        <p className="course-description">{course.course_description.join(" ")}</p>
                        <p>{course.course_hrs} credit hours</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseListView;