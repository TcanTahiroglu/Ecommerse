import React, { useState, useEffect } from "react"; // React ve useState, useEffect import ediliyor
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions"; // fetchProducts action'ını import et
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const dispatch = useDispatch();
  const { products, total, isLoading } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());  // Ürünleri çek
  }, [dispatch]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return <div className="spinner">Loading...</div>;  // Loading spinner'ı
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <ul className="space-y-4">
        {currentProducts.map((product) => (
          <li
            key={product.id}
            className="flex items-center p-4 border rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.department}</p>
              <p className="text-green-600 font-bold">{product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="text-blue-500 hover:underline"
              >
                Detaylar
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Önceki
        </button>
        <span>Sayfa {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= products.length}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Shop;
