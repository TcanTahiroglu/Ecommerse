import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slides = [
    {
      id: 1,
      season: 'SUMMER 2024',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale.',
      buttonText: 'SHOP NOW',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070'
    }
  ];

  return (
    <div className="relative w-full h-[600px] bg-[#23A6F0] overflow-hidden">
      <div className="container mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          {/* Text Content */}
          <div className="text-white px-4 md:px-0 z-10">
            <h3 className="text-base font-bold mb-4">{slides[currentSlide].season}</h3>
            <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
            <p className="text-xl mb-8">{slides[currentSlide].description}</p>
            <button className="bg-[#2DC071] hover:bg-[#2DC071]/90 text-white px-10 py-4 rounded-md transition-colors">
              {slides[currentSlide].buttonText}
            </button>
          </div>

          {/* Image */}
          <div className="relative h-full">
            <img
              src={slides[currentSlide].image}
              alt="Fashion model"
              className="absolute right-0 h-full w-full object-cover md:object-contain"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-20"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-20"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
