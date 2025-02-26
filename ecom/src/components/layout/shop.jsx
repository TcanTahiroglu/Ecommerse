import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../store/actions/productActions';
import { FiSearch } from 'react-icons/fi';
import TopCategories from '../TopCategories';
import { FaSpinner } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 25;

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, categoryName, categoryId } = useParams();
  const { products, loading, error, pagination } = useSelector((state) => state.products);
  
  const [filterInput, setFilterInput] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based index için değiştirildi

  useEffect(() => {
    const params = {
      limit: ITEMS_PER_PAGE,
      offset: currentPage * ITEMS_PER_PAGE,
      ...(categoryId && { category: categoryId }),
      ...(filter && { filter }),
      ...(sort && { sort })
    };
    
    dispatch(fetchProducts(params));
    window.scrollTo(0, 0);
  }, [dispatch, categoryId, filter, sort, currentPage]);

  const handleSearch = () => {
    setFilter(filterInput);
    setCurrentPage(0);
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
    setCurrentPage(0);
  };

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  // Toplam sayfa sayısını hesapla
  const pageCount = Math.ceil((pagination?.total || 0) / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-5xl" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopCategories />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ürünler</h1>
          
          <div className="flex gap-4">
            <div className="flex items-center">
              <label htmlFor="search" className="sr-only">Ürün ara</label>
              <input
                id="search"
                type="text"
                placeholder="Ürün ara..."
                value={filterInput}
                onChange={handleFilterChange}
                onKeyPress={handleKeyPress}
                className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                aria-label="Ara"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="sr-only">Sıralama seçeneği</label>
              <select
                id="sort"
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
        </div>

        {products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="relative pt-[100%]">
                    <img
                      src={product.images?.[0]?.url || 'https://placehold.co/300x300'}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-white hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300';
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-1 hover:text-blue-600 transition-colors">{product.name}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm h-10">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">{Number(product.price).toFixed(2)}₺</span>
                      <button 
                        className="bg-[#2DC071] text-white px-4 py-2 rounded hover:bg-[#2DC071]/90 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Sepete ekleme fonksiyonu buraya gelecek
                        }}
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <ReactPaginate
                previousLabel="Önceki"
                nextLabel="Sonraki"
                pageClassName="inline-block"
                pageLinkClassName="px-3 py-2 mx-1 rounded hover:bg-gray-200"
                previousClassName="inline-block"
                previousLinkClassName="px-3 py-2 mx-1 rounded hover:bg-gray-200"
                nextClassName="inline-block"
                nextLinkClassName="px-3 py-2 mx-1 rounded hover:bg-gray-200"
                breakLabel="..."
                breakClassName="inline-block"
                breakLinkClassName="px-3 py-2 mx-1"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="flex justify-center items-center space-x-1 text-gray-700"
                activeClassName="bg-blue-500 text-white rounded"
                forcePage={currentPage}
              />

              <div className="text-center mt-4 text-gray-600">
                Toplam {pagination?.total || 0} üründen {currentPage * ITEMS_PER_PAGE + 1} - {Math.min((currentPage + 1) * ITEMS_PER_PAGE, pagination?.total || 0)} arası gösteriliyor
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Ürün bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
