/* CourseList.js
 * Description: Lists courses, their descriptions,
    and their hours.
 */

    import React, { useEffect, useState } from 'react';
    import './CourseList.css';
    
    // Lists courses, their description, and their number of credit hours
    const CourseListView = ({ courses }) => {
        const [resultsJSON, setResultsJSON] = useState(null);
    
        // Get data from Flask server
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:5000/RyanData', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            'Computer Science': 'coursename',
                        }),
                    });
        
                    if (!response.ok) throw new Error('Network response was not ok');
        
                    const data = await response.json();
                    setResultsJSON(data);  // Expecting an array of course objects
        
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            };
        
            fetchData();
        }, []);
    
        // Don't show anything (including title) if there are no courses
        if (!resultsJSON || resultsJSON.length === 0) {
            return null;
        }
    
        return (
            <div>
                <h2> Required Courses </h2>
                {/* Render the fetched courses */}
                <ul>
                    {/* {resultsJSON((course, index) => (
                        <li key={index} className="course-item">
                            <h3>{course.name}</h3>
                            <p className="course-description">{course.description}</p>
                            <p>{course.credits} credit hours</p>
                        </li>
                    ))} */}
                </ul>
            </div>
        );
    };
    
    export default CourseListView;