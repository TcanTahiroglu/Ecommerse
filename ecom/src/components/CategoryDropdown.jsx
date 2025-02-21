import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/categoryActions';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch categories if we don't have any
    if (!categories.length && !loading && !error) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, loading, error]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!categories || !Array.isArray(categories)) return null;

  const groupedCategories = categories.reduce((acc, category) => {
    if (!category) return acc;
    
    const gender = (category.gender?.toLowerCase() || 'other').trim();
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, {});

  const getCategoryPath = (category) => {
    if (!category) return '/shop';
    
    const gender = category.gender?.toLowerCase()?.trim() || 'all';
    const name = category.name?.toLowerCase()?.replace(/[^a-z0-9]+/g, '-')?.trim() || 'category';
    const id = category.id || '0';
    return `/shop/${gender}/${name}/${id}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none flex items-center"
      >
        <span>Categories</span>
        {loading && <span className="ml-2">Loading...</span>}
      </button>

      {isOpen && categories.length > 0 && (
        <div className="absolute z-50 w-64 mt-2 bg-white rounded-md shadow-lg">
          <div className="p-2">
            {Object.entries(groupedCategories).map(([gender, genderCategories]) => (
              <div key={gender} className="mb-4">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-700 uppercase">
                  {gender === 'other' ? 'General' : gender}
                </h3>
                <div className="space-y-1">
                  {genderCategories.map((category) => (
                    <Link
                      key={category.id || Math.random()}
                      to={getCategoryPath(category)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{category.name}</span>
                      {category.rating && (
                        <span className="ml-2 text-yellow-500 text-xs">
                          ★ {Number(category.rating).toFixed(1)}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && error && (
        <div className="absolute z-50 w-64 mt-2 bg-white rounded-md shadow-lg p-4">
          <p className="text-red-500 text-sm">Error loading categories</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
