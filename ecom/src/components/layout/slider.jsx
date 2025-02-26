import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    season: "SUMMER 2020",
    title: "Vita Classic Product",
    description: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    buttonText: "ADD TO CART"
  },
  {
    id: 2,
    season: "SUMMER 2020",
    title: "New Fashion Line",
    description: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    image: "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    buttonText: "ADD TO CART"
  }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative bg-[#2DC071]">
      <div className="container mx-auto">
        <div className="relative min-h-[600px]">
          {/* Slider Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
            {/* Left Side - Text */}
            <div className="text-white z-10 py-12">
              <span className="text-sm mb-4 block">{slide.season}</span>
              <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-base mb-6 max-w-md">{slide.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{slide.price}</span>
                <button className="bg-white text-[#2DC071] px-8 py-3 rounded hover:bg-opacity-90 transition-colors font-bold">
                  {slide.buttonText}
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-[400px] md:h-[600px] order-first md:order-last">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute right-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
