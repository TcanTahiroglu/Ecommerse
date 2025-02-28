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
  const { productId } = useParams(); // URL'den productId'yi alıyoruz
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    try {
      console.log('ProductDetail - Sepete eklenen ürün:', product);
      console.log('ProductDetail - Ürün ID:', product.id);
      
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
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleBack} className="back-button">Go Back</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <p>Product not found! Please check the product ID.</p>
        <button onClick={handleBack} className="back-button">Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>
      
      <div className="product-detail-content">
        <div className="product-images">
          {product.images && product.images.map((image, index) => (
            <img 
              key={index}
              src={image.url} 
              alt={`${product.name} - View ${index + 1}`}
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
          <p className="product-description">{product.description || "No description available."}</p>
          
          <div className="product-stats">
            <div className="rating">
              <span>Rating: {product.rating}/5</span>
              <span>({product.sell_count} sold)</span>
            </div>
            
            <div className="stock-info">
              <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="price-section">
            <span className="price">{Number(product.price).toFixed(2)}₺</span>
            <button 
              className="add-to-cart-btn"
              disabled={product.stock === 0}
              style={{ backgroundColor: "#2DC071", color: "white", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}
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
