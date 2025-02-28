import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/actions/productActions';
import { addToCart } from '../../store/reducers/cartSlice';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Shoppage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, categoryName, categoryId } = useParams();
  
  // Get parameters from URL or use defaults
  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;
  const limitFromUrl = parseInt(searchParams.get('limit')) || 25;
  const filterFromUrl = searchParams.get('filter') || '';
  const sortFromUrl = searchParams.get('sort') || '';
  
  // States for all filter parameters
  const [currentPage, setCurrentPage] = useState(pageFromUrl - 1); // ReactPaginate is 0-indexed
  const [itemsPerPage, setItemsPerPage] = useState(limitFromUrl);
  const [searchFilter, setSearchFilter] = useState(filterFromUrl);
  const [searchInputValue, setSearchInputValue] = useState(filterFromUrl);
  const [sortOption, setSortOption] = useState(sortFromUrl);
  
  const { products, loading, error } = useSelector((state) => state.products);
  const { pagination } = useSelector((state) => state.products);
  const totalProducts = pagination?.totalItems || 0;

  // Define sorting options
  const sortOptions = [
    { value: '', label: 'Varsayılan Sıralama' },
    { value: 'price:asc', label: 'Fiyat (Artan)' },
    { value: 'price:desc', label: 'Fiyat (Azalan)' },
    { value: 'rating:asc', label: 'Puan (Artan)' },
    { value: 'rating:desc', label: 'Puan (Azalan)' },
    { value: 'name:asc', label: 'İsim (A-Z)' },
    { value: 'name:desc', label: 'İsim (Z-A)' },
  ];

  // URL için isim oluşturma fonksiyonu
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Boşlukları tire ile değiştir
      .replace(/[^\w\-]+/g, '')       // Alfanümerik olmayan karakterleri kaldır
      .replace(/\-\-+/g, '-')         // Birden fazla tireyi tek tire ile değiştir
      .replace(/^-+/, '')             // Baştaki tireleri kaldır
      .replace(/-+$/, '');            // Sondaki tireleri kaldır
  };

  // Ürün detay sayfasına yönlendirme fonksiyonu
  const handleProductClick = (product) => {
    if (!product || !product.id) return;
    
    const productNameSlug = slugify(product.name);
    const genderPath = gender || 'all';
    const catName = categoryName || 'all-products';
    const catId = categoryId || 0;
    
    navigate(`/shop/${genderPath}/${catName}/${catId}/${productNameSlug}/${product.id}`);
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFilter(searchInputValue);
    setCurrentPage(0); // Reset to first page when search changes
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(0); // Reset to first page when sort changes
  };

  // Fetch products when filter parameters change
  useEffect(() => {
    const params = {
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage
    };

    // Add category filter if we're on a category page
    if (categoryId) {
      params.category = categoryId;
    }

    // Add search filter if set
    if (searchFilter) {
      params.filter = searchFilter;
    }

    // Add sort option if set
    if (sortOption) {
      params.sort = sortOption;
    }
    
    dispatch(fetchProducts(params));
    
    // Update URL with current state parameters
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', currentPage + 1);
    newSearchParams.set('limit', itemsPerPage);
    
    if (searchFilter) {
      newSearchParams.set('filter', searchFilter);
    }
    
    if (sortOption) {
      newSearchParams.set('sort', sortOption);
    }
    
    const newUrl = `${location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
    navigate(newUrl, { replace: true });
  }, [currentPage, itemsPerPage, searchFilter, sortOption, dispatch, categoryId, location.pathname, navigate]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    try {
      if (!product || !product.id) {
        toast.error('Geçersiz ürün verisi. Sepete eklenemiyor.');
        console.error('Geçersiz ürün verisi:', product);
        return;
      }
      
      dispatch(addToCart(product));
      
      toast.success('Ürün sepete eklendi!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Ürün sepete eklenirken bir hata oluştu.');
      console.error('Sepete ekleme hatası:', error);
    }
  };

  const getPageTitle = () => {
    if (!categoryName) return 'Shop';
    
    // Translate gender
    const genderText = gender === 'k' ? 'Kadın' : gender === 'e' ? 'Erkek' : '';
    return `${genderText} - ${categoryName}`;
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#23A6F0] border-t-transparent"></div>
      </div>
    );
  }

  const pageCount = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">
            {getPageTitle()}
          </h1>
          <div className="flex items-center text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            {gender && (
              <>
                <span>Shop</span>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900">
              {categoryName || 'Shop'}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                    value={searchInputValue}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#23A6F0] text-white px-4 py-2 rounded-r hover:bg-[#1A91D1] transition-colors"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-gray-700 whitespace-nowrap">Sıralama:</label>
              <select
                id="sort"
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                value={sortOption}
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchFilter || sortOption) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Aktif Filtreler:</span>
              
              {searchFilter && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>Arama: {searchFilter}</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-red-500"
                    onClick={() => {
                      setSearchFilter('');
                      setSearchInputValue('');
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
              
              {sortOption && (
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                  <span>Sıralama: {sortOptions.find(opt => opt.value === sortOption)?.label}</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-red-500"
                    onClick={() => setSortOption('')}
                  >
                    ×
                  </button>
                </div>
              )}

              <button 
                className="text-sm text-[#23A6F0] hover:underline"
                onClick={() => {
                  setSearchFilter('');
                  setSearchInputValue('');
                  setSortOption('');
                }}
              >
                Tüm Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading && products.length > 0 && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#23A6F0] border-t-transparent"></div>
          </div>
        )}
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative pb-[100%]">
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0].url : 'https://placehold.co/600x400?text=No+Image'}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400?text=No+Image';
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800 hover:text-[#23A6F0]">{product.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-[#23A6F0]">
                      ${product.price}
                    </span>
                    <button 
                      className="bg-[#2DC071] text-white px-4 py-2 rounded hover:bg-[#25A862] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // Tıklama olayının üst elemana (karta) yayılmasını engelle
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-500 py-8">
              {searchFilter ? 
                `"${searchFilter}" için ürün bulunamadı` : 
                'Ürün bulunamadı'}
            </div>
          )
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-8">
            <ReactPaginate
              previousLabel={<span className="flex items-center justify-center">«</span>}
              nextLabel={<span className="flex items-center justify-center">»</span>}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              containerClassName={"flex justify-center items-center space-x-1"}
              pageClassName={"w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"}
              pageLinkClassName={"w-full h-full flex items-center justify-center"}
              previousClassName={"w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"}
              nextClassName={"w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"}
              breakClassName={"flex items-center justify-center px-3"}
              activeClassName={"!bg-[#23A6F0] text-white border-[#23A6F0]"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
              renderOnZeroPageCount={null}
            />
            <div className="text-center text-gray-500 text-sm mt-2">
              Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalProducts)} of {totalProducts} products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shoppage;