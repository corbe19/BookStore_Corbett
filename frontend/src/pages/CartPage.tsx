import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleClearCart() {
    clearCart();
    navigate('/books');
    if (cart.length > 0) {
      alert('Thank you for your purchase!');
    } else {
      alert('Broke boy.');
    }
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                {item.title} - Quantity: {item.quantity} - Price: $
                {(item.price * item.quantity).toFixed(2)}
                <button onClick={() => removeFromCart(item.bookId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Subtotal: {totalAmount.toFixed(2)}</h3>
      <button onClick={() => handleClearCart()}>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
