import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPick = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">EDITOR'S PICK</h2>
        <p className="text-gray-600 text-center mb-8">Problems trying to resolve the conflict between</p>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Men Category - Büyük görsel */}
          <div className="col-span-12 md:col-span-6 relative group">
            <Link to="/shop/men" className="block h-[500px] overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Men's Fashion"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6">
                <span className="bg-white px-6 py-2 text-lg font-semibold">MEN</span>
              </div>
            </Link>
          </div>

          {/* Women ve Accessories/Kids - Sağ taraf */}
          <div className="col-span-12 md:col-span-6 grid grid-rows-2 gap-4">
            {/* Women Category */}
            <div className="relative group">
              <Link to="/shop/women" className="block h-[240px] overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Women's Fashion"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-white px-6 py-2 text-lg font-semibold">WOMEN</span>
                </div>
              </Link>
            </div>

            {/* Accessories ve Kids - Alt sıra */}
            <div className="grid grid-cols-2 gap-4">
              {/* Accessories Category */}
              <div className="relative group">
                <Link to="/shop/accessories" className="block h-[240px] overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Accessories"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-white px-6 py-2 text-lg font-semibold">ACCESSORIES</span>
                  </div>
                </Link>
              </div>

              {/* Kids Category */}
              <div className="relative group">
                <Link to="/shop/kids" className="block h-[240px] overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Kids Fashion"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-white px-6 py-2 text-lg font-semibold">KIDS</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;
