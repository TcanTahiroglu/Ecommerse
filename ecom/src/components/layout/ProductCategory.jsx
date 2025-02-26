import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Basic Colored Sweatshirt",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/8346230/pexels-photo-8346230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 3,
    name: "White Summer Top",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 4,
    name: "Leather Brown Jacket",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/7679649/pexels-photo-7679649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 5,
    name: "Gray Hooded Jacket",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/6311593/pexels-photo-6311593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 6,
    name: "Yellow Casual Sweater",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 7,
    name: "Sport Hoodie Red",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  },
  {
    id: 8,
    name: "Black Graphic T-Shirt",
    department: "English Department",
    originalPrice: "$16.48",
    salePrice: "$6.48",
    image: "https://images.pexels.com/photos/8346230/pexels-photo-8346230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"]
  }
];

const ProductCategory = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-sm text-gray-600 mb-2">Featured Products</h3>
          <h2 className="text-2xl font-bold mb-2">BESTSELLER PRODUCTS</h2>
          <p className="text-sm text-gray-600">Problems trying to resolve the conflict between</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Link 
                  to={`/product/${product.id}`}
                  className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300"
                />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-base font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.department}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-600">{product.originalPrice}</span>
                  <span className="text-[#23856D]">{product.salePrice}</span>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full cursor-pointer"
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

export default ProductCategory;
