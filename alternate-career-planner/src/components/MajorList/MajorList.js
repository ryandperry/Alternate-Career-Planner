import React from 'react';
import './MajorList.css';
import {Link} from 'react-router-dom';

// Lists majors and their descriptions 
const MajorList = ({ majors }) => {
    return (
        <div>
            <ul>
                {majors.map((major, index) => (
                    <li key={index} className="majorlist-item">
                        <Link to={`/results/majors/${encodeURIComponent(major.name)}`}>
                            <h3 className="majorlist-title">{major.name}</h3>
                            <p className="majorlist-description">{major.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MajorList;