/* FileUploader.js
 * Description: Users can upload their academic history file.
 */

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCourseContent, coursesTaken } from './FileHandler';

const FileUploader = ({ onFileParse }) => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [error, setError] = useState('');
    const hiddenFileInput = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type !== 'text/html') {
            setError('Invalid file type. Please upload an HTML file.');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            parseCourseContent(content)
                .then(() => {
                    setFileUploaded(true);
                    onFileParse([...coursesTaken]);
                    navigate('/course_history');
                })
                .catch((error) => {
                    console.error('Error processing file: ', error);
                    setError('Failed to process file. Please try again');
                });
        };

        reader.onerror = (err) => {
            console.error("Error reading file:", err);
                    setError('Failed to read file. Please try again');
        };

        reader.readAsText(file);
    };

    const handleViewCourseHistory = () => {
        navigate('/course_history');
    }

    return (
        <>
            <div className="buttons">
                {error && <p>{error}</p>}
                {fileUploaded ? (
                    <button
                        className="upload-button"
                        onClick={handleViewCourseHistory}
                    >
                        View Course History
                    </button>
                ) : (
                    <button
                        className="upload-button"
                        onClick={handleClick}
                    >
                        Upload File
                    </button>
                )}
                <input
                    type='file'
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </div>
        </>
    );
};

export default FileUploader;
