import React, { useState, useRef, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CustomSliderProps {
    children: React.ReactNode;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ children }) => {
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const maxDots = 4;
    const [dotRangeStart, setDotRangeStart] = useState(0);
    const [dotRangeEnd, setDotRangeEnd] = useState(maxDots);

    const updateDotRange = (newStart: number, newEnd: number) => {
        setDotRangeStart(newStart);
        setDotRangeEnd(newEnd);
    };

    useEffect(() => {
        // Function to check the window size and set the slider to a specific slide
        const checkWindowSizeAndSetSlide = () => {
            // Only apply the effect if the window width is less than or equal to 600px
            if (window.innerWidth <= 600) {
                const timeout = setTimeout(() => {
                    if (sliderRef.current) {
                        sliderRef.current.slickGoTo(0); // Go to slide index 3
                    }
                }, 1000); // Adjust time as necessary

                // Return a cleanup function to clear the timeout
                return () => clearTimeout(timeout);
            }
        };

        // Initial check
        checkWindowSizeAndSetSlide();

        // Set up the event listener for window resize
        window.addEventListener('resize', checkWindowSizeAndSetSlide);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', checkWindowSizeAndSetSlide);
        };
    }, []);

    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
        appendDots: (dots: React.ReactNode[]) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {dotRangeStart > 0 && (
                    <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer" onClick={() => updateDotRange(dotRangeStart - maxDots, dotRangeEnd - maxDots)} />
                )}
                <ul style={{ textAlign: 'center', padding: '0 20px' }}>{dots.slice(dotRangeStart, dotRangeEnd)}</ul>
                {dotRangeEnd < dots.length && (
                    <FontAwesomeIcon icon={faChevronRight} className="cursor-pointer" onClick={() => updateDotRange(dotRangeStart + maxDots, dotRangeEnd + maxDots)} />
                )}
            </div>
        ),
        customPaging: (i: number) => (
            <button onClick={() => sliderRef.current?.slickGoTo(i + dotRangeStart)}>
                {i + 1 + dotRangeStart}
            </button>
        ),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return <Slider ref={sliderRef} {...settings}>{children}</Slider>;
};

export default CustomSlider;
