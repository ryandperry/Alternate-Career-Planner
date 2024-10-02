import React from 'react';
import './MajorList.css'

// Lists majors and their descriptions 
const MajorList = ({ majors }) => {
    return (
        <div>
            <ul>
                {majors.map((major, index) => (
                    <li key={index} className="majorlist-item">
                        <h3 className="majorlist-title">{major.name}</h3>
                        <p className="majorlist-description">{major.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MajorList;