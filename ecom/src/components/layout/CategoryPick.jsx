import React from "react";
import data from "../../data.json";

const CategoryPick = () => {
  const { colors } = data;

  return (
    <div className="cat category-pick flex flex-col justify-center items-center mt-8">
      {/* Başlıklar */}
      <h2 className="text-3xl font-bold text-gray-900">EDITOR’S PICK</h2>
      <p className="text-gray-600 mt-2 mb-6">
        Problems trying to resolve the conflict between
      </p>

      <div className="grid grid-cols-3 gap-4 pr-5 md:grid-cols-4">
        {/* Men */}
        <div className="relative">
          <img
            src="/images/dummy_510x500.png"
            alt="Men"
            className="w-full h-[500px] object-cover"
          />
          <button
            className="absolute bottom-0 left-0 w-full py-2 text-white hover:bg-secondary"
            style={{ backgroundColor: colors.tertiary }}
          >
            Men
          </button>
        </div>

        {/* Women */}
        <div className="relative">
          <img
            src="/images/dummy_240x500.png"
            alt="Women"
            className="w-full h-[500px] object-cover"
          />
          <button
            className="absolute bottom-0 left-0 w-full py-2 text-white hover:bg-secondary"
            style={{ backgroundColor: colors.tertiary }}
          >
            Women
          </button>
        </div>

        {/* Accessories ve Kids (Üst Üste) */}
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          {/* Accessories */}
          <div className="relative">
            <img
              src="/images/dummy_240x242.png"
              alt="Accessories"
              className="w-full h-[240px] object-cover"
            />
            <button
              className="absolute bottom-0 left-0 w-full py-2 text-white hover:bg-secondary"
              style={{ backgroundColor: colors.tertiary }}
            >
              Accessories
            </button>
          </div>

          {/* Kids */}
          <div className="relative">
            <img
              src="/images/dummy_240x242.png"
              alt="Kids"
              className="w-full h-[240px] object-cover"
            />
            <button
              className="absolute bottom-0 left-0 w-full py-2 text-white hover:bg-secondary"
              style={{ backgroundColor: colors.tertiary }}
            >
              Kids
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPick;
