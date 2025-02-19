import React from "react";
import TeamPage from "./Teampage";

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-[400px]">
        <img
          src="/images/dummy_1440x720.png"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold">About Company</h1>
          <p className="text-lg mt-2">We know how large objects will act, but things on a small scale</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700">
            Get Quote Now
          </button>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="flex justify-around text-center py-12 bg-gray-100">
        <div>
          <h2 className="text-3xl font-bold">15K</h2>
          <p className="text-sm text-gray-600">Happy Customers</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">150K</h2>
          <p className="text-sm text-gray-600">Visitors</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">15</h2>
          <p className="text-sm text-gray-600">Worldwide</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="text-sm text-gray-600">Top Partners</p>
        </div>
      </div>
      
      {/* Teams Section */}
      <div className="py-12">
        <TeamPage />
      </div>
    </div>
  );
};

export default AboutUs;
