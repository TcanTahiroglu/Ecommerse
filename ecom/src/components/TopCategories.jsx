import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/categoryActions';

const DEFAULT_IMAGE = 'https://placehold.co/300x400/e2e8f0/1e293b?text=Category';

const TopCategories = () => {
  const dispatch = useDispatch();
  const { topCategories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <div className="text-center">Yükleniyor...</div>
      </div>
    </div>
  );

  if (!topCategories || topCategories.length === 0) return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <div className="text-center">Henüz kategori bulunmamaktadır.</div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender || 'all'}/${category.name?.toLowerCase() || 'category'}/${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={category.image || DEFAULT_IMAGE}
                  alt={category.name || 'Category'}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = DEFAULT_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name || 'Category'}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
