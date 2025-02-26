import React from 'react';
import { Link } from 'react-router-dom';

const EditorsPick = () => {
  const categories = [
    {
      id: 1,
      title: 'MEN',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974',
      path: '/shop/men',
      cols: 'col-span-1'
    },
    {
      id: 2,
      title: 'WOMEN',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070',
      path: '/shop/women',
      cols: 'col-span-1'
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1965',
      path: '/shop/accessories',
      cols: 'col-span-1'
    },
    {
      id: 4,
      title: 'KIDS',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972',
      path: '/shop/kids',
      cols: 'col-span-1'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">EDITOR'S PICK</h2>
          <p className="text-gray-600">Problems trying to resolve the conflict between</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`group relative h-[400px] overflow-hidden ${category.cols}`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <button className="bg-white hover:bg-gray-100 text-gray-800 px-10 py-3 font-medium transition-colors">
                  {category.title}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
