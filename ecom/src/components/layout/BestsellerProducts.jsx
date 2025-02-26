import React from 'react';
import { Link } from 'react-router-dom';

const BestsellerProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 2,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1600442715817-4d9c8b6c729c?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 3,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 4,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 5,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 6,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 7,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 8,
      title: 'Graphic Design',
      department: 'English Department',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1920',
      price: 16.48,
      originalPrice: 6.48,
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#737373] text-sm font-bold mb-2">Featured Products</p>
          <h2 className="text-2xl font-bold text-[#252B42] mb-2">BESTSELLER PRODUCTS</h2>
          <p className="text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-[#252B42] mb-2">{product.title}</h3>
                <p className="text-sm text-[#737373] mb-2">{product.department}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-[#737373] font-bold">${product.price}</span>
                  <span className="text-[#23856D] font-bold">${product.originalPrice}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;
