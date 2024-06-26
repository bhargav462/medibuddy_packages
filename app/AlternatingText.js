"use client"; // This ensures the component is treated as a client component

import { useEffect, useState } from 'react';

const OscillatingText = ({ textArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [textArray.length]);

  return (
    <div className="overflow-hidden h-[25px] relative text-center">
      <div
        className="absolute w-full transition-all duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * (100 / textArray.length)}%)` }}
      >
        {textArray.map((text, index) => (
          <div key={index} className="h-[25px] flex items-center justify-center text-[12px]">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OscillatingText;
