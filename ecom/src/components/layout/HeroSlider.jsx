import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    title: 'COLLECTION',
    subtitle: 'We know how large objects will act, but things on a small scale.',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    buttonText: 'SHOP NOW'
  },
  {
    id: 2,
    title: 'NEW ARRIVALS',
    subtitle: 'We know how large objects will act, but things on a small scale.',
    image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    buttonText: 'SHOP NOW'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative bg-[#23A6F0]">
      <div className="container mx-auto">
        <div className="relative min-h-[600px] flex items-center">
          {/* Slider Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
            {/* Left Side - Text */}
            <div className="text-white z-10 py-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 max-w-md">{slide.subtitle}</p>
              <Link
                to="/shop"
                className="inline-block bg-[#2DC071] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#25A862] transition-colors"
              >
                {slide.buttonText}
              </Link>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-[400px] md:h-[600px] order-first md:order-last">
              <img
                src={slide.image}
                alt="Hero"
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

export default HeroSlider;
