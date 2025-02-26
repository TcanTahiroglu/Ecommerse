import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchProducts } from '../../store/actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    loading, 
    error, 
    totalProducts, 
    limit 
  } = useSelector(state => state.products);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const offset = currentPage * limit;
    dispatch(fetchProducts(limit, offset));
  }, [currentPage, limit, dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#23A6F0] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    );
  }

  const pageCount = Math.ceil(totalProducts / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Ürün Grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative pb-[100%]">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="absolute top-0 left-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 mb-2 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-[#23A6F0]">
                  ${product.price}
                </span>
                <button className="bg-[#2DC071] text-white px-4 py-2 rounded hover:bg-[#25A862] transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-8">
          <ReactPaginate
            previousLabel="← Previous"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center gap-2 flex-wrap"
            pageClassName="px-3 py-1 rounded border hover:bg-gray-100"
            previousClassName="px-4 py-1 rounded border hover:bg-gray-100 font-medium"
            nextClassName="px-4 py-1 rounded border hover:bg-gray-100 font-medium"
            activeClassName="!bg-[#23A6F0] !text-white !border-[#23A6F0]"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakLabel="..."
            breakClassName="px-3 py-1"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
