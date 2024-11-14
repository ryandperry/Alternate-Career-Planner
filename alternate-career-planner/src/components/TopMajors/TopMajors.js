import React from 'react';
import '../../views/MajorDetailView/MajorDetailView.css';
import MajorHeaderImage from '../MajorHeaderImage/MajorHeaderImage';
import JobsList from '../JobsList/JobsList';
import { testMajors } from '../../views/ResultsView/testMajors';
import { ProgressBar } from '../ProgressBar/ProgressBar';

const TopMajors = ({ majors }) => {
    return (
        <div>
            {majors.map((majorObj, index) => {
                // Look up the major in the testMajors array
                const majorInfo = testMajors.find(m => m.name === majorObj.title);
                
                // Get the description or default text
                const description = majorInfo ? majorInfo.description : "Description not available";
                
                // Get the progress percentage from majorObj
                const progress = majorObj.progress || 0;

                return (
                    <div key={index}>
                        <hr className="solid" />
                        <h1 className="major-title">#{index + 1} {majorObj.title}</h1>
                        <MajorHeaderImage major={{ name: majorObj.title || 
                              "Unknown Major" }} />
                        <p style={{fontSize: '20px'}}>
                            We estimate that you have completed <b>{progress}%</b> of
                            the required courses for <b>{majorObj.title}</b>.
                        </p> 
                        <ProgressBar progress={majorObj.progress || 0} />
                        <p className="major-description">{description}</p>
                        <JobsList majorname={majorObj.title} />
                    </div>
                );
            })}
        </div>
    );
}

export default TopMajors;

