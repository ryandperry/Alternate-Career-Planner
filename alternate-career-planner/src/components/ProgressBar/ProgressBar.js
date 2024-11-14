/* ProgressBar.js
 * Description: Creates a progress bar
 * that increments on button press.
 */

import React from "react";
import './ProgressBar.css'

export const ProgressBar = ({ progress }) => {
    const getColor = () => {
        return "#489FDF";
    };

    return (
        <div className="container">
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: getColor(),
                    }}
                >
                    {" "}
                </div>
            </div>
        </div>
    );
};

