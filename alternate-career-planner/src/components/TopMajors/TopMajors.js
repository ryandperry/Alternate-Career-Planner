import React from 'react';
import '../../views/MajorDetailView/MajorDetailView.css';
import MajorList from '../MajorList/MajorList';
import JobsList from '../JobsList/JobsList';
import MajorHeaderImage from '../MajorHeaderImage/MajorHeaderImage';
import {testMajors} from '../../views/ResultsView/testMajors';

const TopMajors = ({ majors }) => {
    return (
      <div>
      {majors.map((major, index) => {
          const majorInfo = testMajors.find(m => m.name === major);
          const desc = majorInfo ? majorInfo.description : 
                          "Description not available.";



      return(
          <div key={index}>
              <hr class="solid"></hr>
              <h1 className="major-title">#{index+1} {major}</h1>
              <MajorHeaderImage major={{name: major || "Unknown Major"}}/>
              <h2> Description </h2>
              <p className="major-description">{desc}</p>
              <JobsList majorname={major}/>
          </div>
      );
      })}
      </div>
    );
}

export default TopMajors;
