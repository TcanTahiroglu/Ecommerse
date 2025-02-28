import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../../store/actions/productActions";
import { addToCart } from "../../store/reducers/cartSlice";
import { toast } from "react-toastify";
import BestOfSellers from "../layout/BestOfSellers";
import LoadingSpinner from "../common/LoadingSpinner";
import "../../styles/ProductDetail.css";

const ProductDetail = () => {
  // URL'den tüm parametreleri alıyoruz
  const { productId, gender, categoryName, categoryId, productNameSlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Ürün ID'si varsa ürünü yükle
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    
    // Component unmount olduğunda ürünü temizle
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={handleBack} 
          className="back-button flex items-center justify-center mx-auto"
        >
          <span>← Geri Dön</span>
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-gray-700 text-lg mb-4">Ürün bulunamadı! Lütfen ürün ID'sini kontrol edin.</p>
        <button 
          onClick={handleBack} 
          className="back-button flex items-center justify-center mx-auto"
        >
          <span>← Geri Dön</span>
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="back-button flex items-center">
          <span>←</span>
          <span className="ml-2">Geri Dön</span>
        </button>
        
        <div className="breadcrumbs ml-4 text-sm text-gray-500">
          <span>Anasayfa</span>
          <span className="mx-2">/</span>
          <span>{gender === 'k' ? 'Kadın' : gender === 'e' ? 'Erkek' : 'Ürünler'}</span>
          <span className="mx-2">/</span>
          <span>{categoryName || 'Tüm Ürünler'}</span>
          <span className="mx-2">/</span>
          <span className="text-[#23A6F0]">{product.name}</span>
        </div>
      </div>
      
      <div className="product-detail-content">
        <div className="product-images">
          {product.images && product.images.map((image, index) => (
            <img 
              key={index}
              src={image.url} 
              alt={`${product.name} - Görünüm ${index + 1}`}
              className={index === 0 ? "main-image" : "thumbnail"}
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=No+Image';
                e.target.onerror = null;
              }}
            />
          ))}
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description || "Açıklama bulunamadı."}</p>
          
          <div className="product-stats">
            <div className="rating">
              <span>Puanı: {product.rating}/5</span>
              <span>({product.sell_count} satış)</span>
            </div>
            
            <div className="stock-info">
              <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock > 0 ? `${product.stock} adet stokta` : "Stokta yok"}
              </span>
            </div>
          </div>

          <div className="price-section">
            <span className="price">{Number(product.price).toFixed(2)}₺</span>
            <button 
              className="add-to-cart-btn"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      <BestOfSellers />
    </div>
  );
};

export default ProductDetail;
