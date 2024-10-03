/* ProgressBar.js
 * Description: Creates a progress bar
 * that increments on button press.
 */

import React, { useState } from "react";

export const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    // Increments progress by 20% on button press
    const handleButtonClick = ()=>{
        if (progress < 100) {
            setProgress(progress + 20);
        }
    }

    // Resets progress on button press
    const handleButtonReset = () => {
        setProgress(0);
    }

    const getColor = () => {
        return "#ff8200";
    }

    return <div className="container">
        <div className="progress-bar">
            <div 
                className="progress-bar-fill" 
                // Width of progress bar increases as progress increases
                style={{ width: `${progress}%`,
                                 backgroundColor: getColor() }}
            >
                {" "}
            </div>
        </div>
        <div className="progress-label">{progress}%</div>
        <button onClick={handleButtonClick}>Progress</button>
        <button onClick={handleButtonReset}>Reset</button>
    </div>;
};
