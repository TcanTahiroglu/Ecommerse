<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/actions/categoryActions';

const CategoryPick = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#23A6F0] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative pb-[120%]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <span className="text-sm opacity-90">{category.code}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
=======
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
>>>>>>> parent of 6a04b81 (görsel biraz düzenlendi)
        </div>
      </div>
    </div>
  );
};

export default CategoryPick;
