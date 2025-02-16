import React, { useState } from "react";

const sliderData = [
  {
    id: 1,
    title: "VitaClassic Product",
    subtitle: "Summer 2020",
    description: "Experience timeless elegance with our VitaClassic collection. Designed for comfort and style.",
    price: "$99.99",
    image: "/dummy_1440x720.png",
  },
  {
    id: 2,
    title: "VitaClassic Product",
    subtitle: "Summer 2020",
    description: "Step into the future of fashion with our latest VitaClassic designs. Perfect for any occasion.",
    price: "$99.99",
    image: "/dummy_1440x720.png",
  }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${sliderData[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
          <h2 className="text-5xl font-bold">{sliderData[currentIndex].title}</h2>
          <p className="text-2xl mt-2">{sliderData[currentIndex].subtitle}</p>
          <p className="mt-4 max-w-2xl text-lg">{sliderData[currentIndex].description}</p>
          <p className="text-3xl font-semibold mt-4">{sliderData[currentIndex].price}</p>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg">
            Add to Cart
          </button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-4 rounded-full opacity-60 hover:opacity-100"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-4 rounded-full opacity-60 hover:opacity-100"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
