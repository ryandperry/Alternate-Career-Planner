/* ImageSlider.js
 * Description: Image Slider Component. Displays a sequence of 
 * images and their descriptions that the user can scroll through
 */

import { useState } from 'react';

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
      position: 'relative',
      height: '100%',
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${slides[currentIndex].url})`,
        marginBottom: '50px',
    };

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '-45px',
        fontSize: '45px',
        color: '#FF8200',
        zIndex: 1,
        cursor: "pointer"
    };
  
    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '-45px',
        fontSize: '45px',
        color: '#FF8200',
        zIndex: 1,
        cursor: "pointer"
    };

    const checksContainerStyles = {
        justifyContent: 'center',
        paddingBottom: '50px',
    };

    const itemStyles = {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',
        cursor: 'pointer',
        fontSize: '24px'
    };

    const checksStyles = {
      marginRight: '15px',
      cursor: 'pointer',
      fontSize: '24px'
    };

    const titleStyles = (isActive) => ({
        fontWeight: isActive ? 'bold' : 'normal'
    })

    const goToSlide = slideIndex => {
        setCurrentIndex(slideIndex);
    }
    
    const goToPrevious = () => {
        const isFirstslide = currentIndex === 0;
        const newIndex = isFirstslide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
       const isLastSlide = currentIndex === slides.length - 1;
       const newIndex = isLastSlide ? 0 : currentIndex + 1;
       setCurrentIndex(newIndex);
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>❰</div>
            <div style={rightArrowStyles} onClick={goToNext}>❱</div>
            <div style={slideStyles}></div>
            <div style={checksContainerStyles}>
                <h2>How to Download Your Academic History File:</h2>
                {slides.map((slide, slideIndex) => (
                    <div 
                        key={slideIndex}
                        style={itemStyles} 
                        onClick={() => goToSlide(slideIndex)}
                    >
                        <span style={checksStyles}>✅</span>
                        <span style={titleStyles(slideIndex === currentIndex)}>
                            {slide.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ImageSlider;
