import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../store/actions/productActions';
import { FiSearch } from 'react-icons/fi';

const ITEMS_PER_PAGE = 25;

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, categoryName, categoryId } = useParams();
  const productsState = useSelector((state) => state.products);
  
  const { products = [], loading, error, pagination } = productsState;
  
  const [filterInput, setFilterInput] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    };
    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;
    
    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, filter, sort, currentPage]);

  const handleSearch = () => {
    setFilter(filterInput);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.max(1, Math.ceil((pagination?.total || 0) / ITEMS_PER_PAGE));

  const renderPagination = () => {
    // Eğer toplam sayfa sayısı 1 veya daha azsa, pagination'ı gösterme
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          İlk
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Önceki
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Sonraki
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Son
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Hata: {error}
      </div>
    );
  }

  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={filterInput}
              onChange={handleFilterChange}
              onKeyPress={handleKeyPress}
              className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
          
          <select
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sıralama</option>
            <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating:asc">Puan: Düşükten Yükseğe</option>
            <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
          </select>
        </div>
      </div>

      {productList.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Ürün bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images?.[0]?.url || 'https://placehold.co/300x300'}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {renderPagination()}
      
      {pagination && productList.length > 0 && (
        <div className="text-center mt-4 text-gray-600">
          {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, pagination.total)} / Toplam {pagination.total} ürün
        </div>
      )}
    </div>
  );
};

export default Shop;
