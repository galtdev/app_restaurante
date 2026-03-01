// src/components/ProductCard.jsx
import '../styles/styles.css';
import Button from './Button';

export default function ProductCard({ name, price, contain, category, image, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {image ? (
          <img src={image} alt={name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
        <span className="product-category">{category}</span>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        <p className='product_contain'>{contain}</p>
        <Button variant="primary" onClick={onAdd} className="btn-add">
          Agregar al pedido
        </Button>
      </div>
    </div>
  );
}