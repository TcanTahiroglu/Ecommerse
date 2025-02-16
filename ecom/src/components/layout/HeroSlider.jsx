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
    <div className="relative w-[99.1vw] h-[90vh] overflow-hidden">
      {sliderData.length > 0 && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row">
            {/* İlk görsel */}
            <img
              src={sliderData[currentSlide].images[0]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            {/* İkinci görsel - Sağda, sadece yarısı */}
            <img
              src={sliderData[currentSlide].images[1]}
              alt={`Slide ${currentSlide + 1} - 2`}
              className="w-full md:w-1/2 h-full object-cover"
            />
          </div>
          <div className="absolute top-1/3 left-0 text-white z-10 max-w-xl text-left px-10">
            <h2 className="text-3xl font-bold">{sliderData[currentSlide].subtitle}</h2>
            <h1 className="text-5xl font-extrabold">{sliderData[currentSlide].title}</h1>
            <p className="mt-4 text-xl" style={{ maxWidth: '90%', wordWrap: 'break-word' }}>
              {sliderData[currentSlide].description}
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full">
              {sliderData[currentSlide].buttonText}
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 text-white text-3xl md:text-4xl"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 text-white text-3xl md:text-4xl"
          >
            &#10095;
          </button>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderData.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
