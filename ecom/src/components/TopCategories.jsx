import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TopCategories = () => {
  const { categories, loading, error } = useSelector((state) => state.categories);
  const placeholderImage = 'https://placehold.co/300x300/EEE/31343C';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!categories || !Array.isArray(categories)) return null;

  // Get top 5 categories by rating
  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const getCategoryPath = (category) => {
    const gender = category.gender?.toLowerCase() || 'all';
    const name = category.name?.toLowerCase().replace(/\s+/g, '-') || '';
    const id = category.id || '';
    return `/shop/${gender}/${name}/${id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Top Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topCategories.map((category) => (
          <Link
            key={category.id}
            to={getCategoryPath(category)}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={category.image || placeholderImage}
                alt={category.name || 'Category'}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  if (e.target.src !== placeholderImage) {
                    e.target.src = placeholderImage;
                  }
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-semibold">{category.name || 'Unknown Category'}</h3>
              {category.rating && (
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm">{Number(category.rating).toFixed(1)}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
