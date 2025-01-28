import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.price * item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default CartPage;