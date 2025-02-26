import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/categoryActions';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Kategorileri cinsiyete göre grupla
  const womenCategories = categories.filter(cat => cat.gender === 'k');
  const menCategories = categories.filter(cat => cat.gender === 'e');

  return (
    <div className="bg-white shadow-lg rounded-lg py-2 min-w-[200px]">
      <div className="grid grid-cols-2">
        <div className="px-4">
          <h3 className="font-medium mb-2">Kadın</h3>
          <ul className="space-y-1">
            {womenCategories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/shop/kadin/${category.code.toLowerCase()}/${category.id}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4">
          <h3 className="font-medium mb-2">Erkek</h3>
          <ul className="space-y-1">
            {menCategories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/shop/erkek/${category.code.toLowerCase()}/${category.id}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
