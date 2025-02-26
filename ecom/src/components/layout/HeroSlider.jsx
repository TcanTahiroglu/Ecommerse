import React, { useState, useEffect } from 'react';
import data from "../../data.json";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    setSliderData(data.slider);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {sliderData.length > 0 && (
        <>
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            {/* İlk görsel */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={sliderData[currentSlide].images[0]}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* İkinci görsel */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={sliderData[currentSlide].images[1]}
                alt={`Slide ${currentSlide + 1} - 2`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute top-1/3 left-0 text-white z-20 max-w-xl px-8 md:px-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{sliderData[currentSlide].subtitle}</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{sliderData[currentSlide].title}</h1>
            <p className="text-lg md:text-xl mb-6">
              {sliderData[currentSlide].description}
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
              {sliderData[currentSlide].buttonText}
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 z-20 text-white text-3xl md:text-4xl transform -translate-y-1/2 hover:opacity-75 transition-opacity"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 z-20 text-white text-3xl md:text-4xl transform -translate-y-1/2 hover:opacity-75 transition-opacity"
          >
            &#10095;
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
