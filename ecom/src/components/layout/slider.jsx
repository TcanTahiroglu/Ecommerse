import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      season: 'SUMMER 2020',
      title: 'Vita Classic Product',
      description: 'We know how large objects will act. We know how are objects will act. We know',
      price: '$16.48',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915',
      backgroundColor: '#23856D'
    },
    {
      id: 2,
      season: 'SUMMER 2020',
      title: 'Vita Classic Product',
      description: 'We know how large objects will act. We know how are objects will act. We know',
      price: '$16.48',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974',
      backgroundColor: '#23856D'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[600px]" style={{ backgroundColor: slides[currentSlide].backgroundColor }}>
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-white p-8 md:p-16">
            <span className="text-sm font-bold mb-8">{slides[currentSlide].season}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{slides[currentSlide].title}</h2>
            <p className="text-base mb-8 max-w-md">{slides[currentSlide].description}</p>
            <div className="flex items-center gap-8">
              <span className="text-2xl font-bold">{slides[currentSlide].price}</span>
              <button className="bg-[#2DC071] hover:bg-[#2DC071]/90 text-white px-10 py-4 font-bold transition-colors">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-full">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute right-0 h-full w-full object-cover md:object-contain"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-10"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full z-10"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
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
    </section>
  );
};

export default Slider;
