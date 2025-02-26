import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryDropdown = () => {
  const { categories, loading, error } = useSelector((state) => state.categories);

  if (loading) {
    return <div className="p-4">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading categories</div>;
  }

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
                  to={`/shop/kadin/${category.code}/${category.id}`}
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
                  to={`/shop/erkek/${category.code}/${category.id}`}
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
