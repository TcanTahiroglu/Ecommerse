import React from "react";
import { products } from "../../data";

const ProductCategory = () => {
  return (
    <div className="text-center my-10">
      <h2 className="text-3xl font-bold">Editor's Pick</h2>
      <p className="text-gray-600">Carefully curated selections just for you</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-500">{product.department}</p>
            <p className="text-xl font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
