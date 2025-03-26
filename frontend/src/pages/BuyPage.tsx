import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookId, price: priceParam } = useParams();
  const price = priceParam ? Number(priceParam) : 0; // Convert price to number or default to 0
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'Unknown Title',
      quantity,
      price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Purchase Quantity
      </h2>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          placeholder="Enter Quantity"
          min="1"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <button
          onClick={() => handleAddToCart()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </button>
      </div>
      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default BuyPage;
