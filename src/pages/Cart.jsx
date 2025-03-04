// import { useDispatch, useSelector } from "react-redux";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useEffect } from "react";
// import { addToCart, fetchCart, removeFromCart, updateCartItem } from "./cartSlice";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const { items, status, error } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleAddToCart = () => {
//     dispatch(addToCart({ productId: "123", quantity: 1 }));
//   };

//   const handleRemoveFromCart = () => {
//     dispatch(removeFromCart({ cartId: "cart123", productId: "123" }));
//   };

//   const handleUpdateQuantity = () => {
//     dispatch(updateCartItem({ cartId: "cart123", productId: "123", quantity: 2 }));
//   };

//   return (
//     <div>
//       <Header/>
//       {status === "loading" && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <ul>
//         {items.map((item) => (
//           <li key={item._id}>{item.productId} - Qty: {item.quantity}</li>
//         ))}
//       </ul>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//       <button onClick={handleRemoveFromCart}>Remove from Cart</button>
//       <button onClick={handleUpdateQuantity}>Update Quantity</button>
//       <Footer />
//     </div>
//   );
// };

// export default CartPage;

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "./cartSlice";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartComponent = () => {
  const dispatch = useDispatch();
  const {
    items,
    _id: cartId,
    status,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = () => {
    // Example: Adding a product (adjust productId as needed)
    dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ cartId, productId }));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItem({ cartId, productId, quantity: newQuantity }));
  };

  return (
    <div>
      <Header />
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {status === "succeeded" && items.length === 0 && (
        <p>Your cart is empty</p>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <ul>
                {items.map((item) => (
                  <li key={item._id}>
                    <div className="d-flex">
                      <img
                        src={item.productId.productImageURL}
                        alt={item.productId.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div>
                        <h3>
                          <strong>{item.productId.title}</strong>
                        </h3>
                        <p>Price: ${item.productId.price}</p> - Quantity:{" "}
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      Increase Qty
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      Decrease Qty
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleAddToCart}>Add Example Item to Cart</button>
      <Footer />
    </div>
  );
};

export default CartComponent;
