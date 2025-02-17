import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

const BestOfSellers = () => {
  const bestSellers = data.products.slice(0, 5); // İlk 5 ürünü popüler olarak alalım

  return (
    <div className="best-of-sellers mt-8">
      <h2 className="text-xl font-semibold mb-4">Best of Sellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellers.map((product) => (
          <div key={product.id} className="product-card p-4 border rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.department}</p>
            <p className="text-green-600 font-bold">{product.price} ₺</p>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              Detaylar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestOfSellers;
