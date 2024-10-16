import React from "react";
import './CourseHistory.css';
import CourseHistory from '../../components/CourseHistory/CourseHistory';


const CourseHistoryView = ({courses}) => {
    return (
        <div>
            <h1> List of completed courses </h1>
            <CourseHistory courses = {courses}/>
        </div>
    )
}

export default CourseHistoryView;