'use client';
import { useState, useRef, useEffect } from 'react';
import PackageInfo from "./PackageInfo";

const HorizontalSlider = ({ cardDataInfo }) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [cardDataInfo]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && sliderRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const totalSlides = sliderRef.current.children.length;
        const newSlideWidth = containerWidth / Math.floor(containerWidth / 300);
        setSlideWidth(newSlideWidth);

        if (index >= totalSlides - Math.floor(containerWidth / newSlideWidth)) {
          const newIndex = totalSlides - Math.floor(containerWidth / newSlideWidth);
          setIndex(newIndex >= 0 ? newIndex : 0);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [index]);

  const showSlide = (newIndex) => {
    if (sliderRef.current) {
      const translatePosition = -newIndex * slideWidth;
      sliderRef.current.style.transform = `translateX(${translatePosition > 0 ? 0 : translatePosition}px)`;
    }
  };

  const handleNext = () => {
    if (containerRef.current && (index < cardDataInfo.length - Math.floor(containerRef.current.clientWidth / slideWidth))) {
      const newIndex = index + 1;
      setIndex(newIndex);
      showSlide(newIndex);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      showSlide(newIndex);
    }
  };

  useEffect(() => {
    showSlide(index);
  }, [index, slideWidth]);

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handlePrev}
        className="p-2 bg-white text-[#4585f4] rounded-full mr-2 disabled:opacity-50 h-[34px] w-[34px] flex items-center justify-center shadow-md"
        disabled={index === 0}
      >
        {"<"}
      </button>
      <div className="slider-container w-full h-[400px] bg-[#E8F2FE] overflow-x-auto" ref={containerRef}>
        <div
          className="slider flex transition-transform duration-300 pt-10"
          ref={sliderRef}
        >
            {
                cardDataInfo.map((cardData, index) => {
                  return (
                    <div
                      className="slider-item flex items-start justify-center mr-9 ml-11"
                      style={{ minWidth: slideWidth + 25 }}
                      key={index}
                    >
                      <PackageInfo data={cardData}/>
                    </div>
                  );
                })
            }
        </div>
      </div>
      <button
        onClick={handleNext}
        className="p-2 bg-white text-[#4585f4] rounded-full disabled:opacity-50 h-[34px] w-[34px] flex items-center justify-center shadow-md ml-2"
        disabled={containerRef.current && (index >= cardDataInfo.length - Math.floor(containerRef.current.clientWidth / slideWidth))}
      >
        {">"}
      </button>
    </div>
  );
};

export default HorizontalSlider;
