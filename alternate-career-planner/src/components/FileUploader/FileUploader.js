import { useRef } from 'react';

const FileUploader = ({handleFile}) => {
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    return (
        <>
            <button
                className="upload-button"
                onClick={handleClick}
            >
                Upload File
            </button>
            <input
                type='file'
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{display:'none'}}
            />
        </>
    );
};

export default FileUploader;
