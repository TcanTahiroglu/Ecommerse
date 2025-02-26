import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchProducts, loadMoreProducts } from '../../store/actions/productActions';
import { FiSearch } from 'react-icons/fi';
import TopCategories from '../TopCategories';
import { FaSpinner } from 'react-icons/fa';

const ITEMS_PER_PAGE = 25;

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, categoryName, categoryId } = useParams();
  const { products, loading, error, pagination } = useSelector((state) => state.products);
  
  const [filterInput, setFilterInput] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(0);

  // URL'den parametreleri al
  useEffect(() => {
    if (categoryId) {
      // URL'de categoryId varsa, bu kategoriyi kullan
      fetchProductsWithParams({ category: categoryId });
    } else {
      // Yoksa tüm ürünleri getir
      fetchProductsWithParams();
    }
  }, [categoryId]);

  // Ürünleri getir
  const fetchProductsWithParams = (additionalParams = {}) => {
    setPage(0);
    const params = {
      limit: ITEMS_PER_PAGE,
      offset: 0,
      ...(filter && { filter }),
      ...(sort && { sort }),
      ...additionalParams
    };
    dispatch(fetchProducts(params));
  };
  
  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        console.log('Loading more products...', { page, total: pagination.totalItems });
        const nextPage = page + 1;
        setPage(nextPage);
        
        dispatch(loadMoreProducts({
          limit: ITEMS_PER_PAGE,
          offset: nextPage * ITEMS_PER_PAGE,
          ...(categoryId && { category: categoryId }),
          ...(filter && { filter }),
          ...(sort && { sort })
        }));
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore, page, categoryId, filter, sort]);

  const handleSearch = () => {
    setFilter(filterInput);
    fetchProductsWithParams({ filter: filterInput });
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
    const newSort = e.target.value;
    setSort(newSort);
    fetchProductsWithParams({ sort: newSort });
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Hata: {error}
      </div>
    );
  }

  const currentItemCount = products.length;
  const totalItems = pagination.totalItems;
  const showingFrom = currentItemCount > 0 ? 1 : 0;
  const showingTo = currentItemCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopCategories />
      <div className="container mx-auto px-4 py-8">
        {/* Kategori Başlığı */}
        {categoryName && (
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {gender === 'kadin' ? 'Kadın' : 'Erkek'} {categoryName}
          </h1>
        )}

        {/* Arama ve Filtreleme Bölümü */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={filterInput}
                  onChange={handleFilterChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border border-r-0 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#23A6F0] placeholder-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-[#23A6F0] text-white rounded-r-lg hover:bg-[#23A6F0]/90 transition-colors"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#23A6F0] text-gray-700"
              >
                <option value="">Sıralama Seçin</option>
                <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating:asc">Puan: Düşükten Yükseğe</option>
                <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aktif Filtreler */}
        {(filter || sort) && (
          <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Aktif Filtreler</h2>
            <div className="flex flex-wrap gap-2">
              {filter && (
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-700">Arama: {filter}</span>
                  <button
                    onClick={() => {
                      setFilter('');
                      setFilterInput('');
                      fetchProductsWithParams({ filter: '' });
                    }}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              )}
              {sort && (
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-700">
                    Sıralama: {
                      sort === 'price:asc' ? 'Fiyat: Düşükten Yükseğe' :
                      sort === 'price:desc' ? 'Fiyat: Yüksekten Düşüğe' :
                      sort === 'rating:asc' ? 'Puan: Düşükten Yükseğe' :
                      'Puan: Yüksekten Düşüğe'
                    }
                  </span>
                  <button
                    onClick={() => {
                      setSort('');
                      fetchProductsWithParams({ sort: '' });
                    }}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sayfa Bilgisi */}
        <div className="text-gray-600 mb-4">
          Toplam {totalItems} üründen {showingFrom} - {showingTo} arası gösteriliyor
        </div>

        {/* Ürün Grid Bölümü */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                ref={index === products.length - 1 ? lastProductElementRef : null}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="relative pt-[100%]">
                  <img
                    src={product.images[0]?.url || 'https://placehold.co/300x300'}
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
                        // Sepete ekleme fonksiyonu
                      }}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Ürün bulunamadı.
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <FaSpinner className="animate-spin text-[#23A6F0] text-3xl" />
          </div>
        )}

        {/* Sayfa Sonu Bilgisi */}
        {!loading && products.length > 0 && (
          <div className="text-center text-gray-600 mt-8">
            {pagination.hasMore ? (
              <p>Daha fazla ürün yükleniyor...</p>
            ) : (
              <p>Tüm ürünler gösteriliyor</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
