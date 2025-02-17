import { useParams } from "react-router-dom";
import data from "../../data.json";
import BestOfSellers from "../layout/BestOfSellers";

const ProductDetail = () => {
  const { id } = useParams();
  const product = data.products.find((prod) => prod.id.toString() === id);

  if (!product) {
    return <div>Ürün bulunamadı! Lütfen geçerli bir ürün ID'si girin.</div>; // Eğer ürün bulunamazsa daha açıklayıcı mesaj
  }

  return (
    <div>
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description || "Açıklama bulunamadı."}</p> {/* Açıklama yoksa yedek metin */}
        <p><strong>Fiyat: </strong>{product.price} ₺</p>
      </div>
      <BestOfSellers />
    </div>
  );
};

export default ProductDetail;
