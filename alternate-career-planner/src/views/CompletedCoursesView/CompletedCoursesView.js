/* CompletedCoursesView.js
 * Description: Displays a student's current
 * progress through their declared major.
 */

import React from 'react';
import './CompletedCoursesView.css';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const CompletedCoursesView (){
    // Dummy data
    const [courses, setCourses] = useState([
        { title: 'Computer Organization', body: 'description...',
            grade: 'A', courseID: 'COSC230', hours: 3 },
        { title: 'Software Engineering', body: 'description...',
            grade: 'A', courseID: 'COSC340', hours: 3 },
        { title: 'Algorithm Analysis and Automata', body: 'description...',
            grade: 'A', courseID: 'COSC312', hours: 3 }
    ]);

    return (
        <div className="App">
            <h1>Progress Through Declared Major</h1>
            <ProgressBar/>
            {courses.map((course) => (
                <div className="course-preview" key={course.courseID}>
                    <h2>{ course.courseID }: { course.title }</h2>
                    <h3>{ course.body }</h3>
                    <p>Grade: { course.grade }</p>
                    <p>Credit Hours: { course.hours }</p>
                </div>
            ))}
        </div>
    );
}

export default CompletedCoursesView;
