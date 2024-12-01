/* MajorDetailView.js
 * Description: Provides details of a given major including
 *  a description and required courses.
 */

import React from 'react';
import './MajorDetailView.css';
import CourseListView from '../../components/CourseList/CourseList';
import MajorHeaderImage from '../../components/MajorHeaderImage/MajorHeaderImage';
import JobsList from '../../components/JobsList/JobsList';
import { useParams } from 'react-router-dom';

// Lists the details of a given major including a description and required courses
const MajorDetailView = ({ majors, courses }) => {

    const { majorName } = useParams();
    console.log("Major name:", majorName);
    const selectedMajor = majors.find(
        (major) => major.name === decodeURIComponent(majorName.replace(/%20/g, ' '))
    );

    const emptyCoursesList = [];

    return (
        <div>
            {/* Header, Title and Description */}
            <MajorHeaderImage major={selectedMajor}/>
            <h1 className="major-title"> {selectedMajor.name} </h1>
            <p className="major-description"> { selectedMajor.description } </p>

            {/* Jobs List */}
            <JobsList majorname={selectedMajor.name}/>

            {/* Required Courses List */}
            <CourseListView major = {selectedMajor.name}/>

        </div>
    )
}

export default MajorDetailView;