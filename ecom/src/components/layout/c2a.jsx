import React from "react";

const C2A = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
      {/* Sol taraftaki görsel */}
      <div className="w-full md:w-1/2">
        <img src="/images/dummy_800x800.png" className="rounded-lg shadow-lg" />
      </div>

      {/* Sağ taraftaki içerik */}
      <div className="w-full md:w-1/2 text-center md:text-left px-6 mt-6 md:mt-0">
        <h2 className="text-4xl font-bold text-gray-800">Summer 2020</h2>
        <h3 className="text-2xl text-gray-600 mt-2">Part of the Universe</h3>
        <p className="text-lg text-gray-500 mt-4">
          Explore the latest trends that blend style with cosmic inspiration. Feel the energy of the universe in every outfit.
        </p>

        {/* Butonlar */}
        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg shadow">
            Buy Now
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-lg shadow">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default C2A;
