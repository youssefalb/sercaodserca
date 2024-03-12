import React, { useState, useRef } from 'react';
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

    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
