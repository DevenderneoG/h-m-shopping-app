import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./cartSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  const dispatch = useDispatch();
  const {
    items,
    _id: cartId,
    status,
    error,
  } = useSelector(
    (state) =>
      state.cart || { items: [], _id: null, status: "idle", error: null }
  );

  const location = useLocation();
  const { selectedAddress } = location.state || {};

  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const discount = 50;

  const calculateDiscountedPrice = (price) => {
    return price - (price * discount) / 100;
  };

  const calculateItemTotal = (price, quantity) => {
    return {
      original: price * quantity,
      discounted: calculateDiscountedPrice(price) * quantity,
    };
  };

  const calculateTotal = () => {
    const totalOriginal = items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
    const totalDiscounted = items.reduce(
      (sum, item) =>
        sum +
        calculateDiscountedPrice(item.productId?.price || 0) * item.quantity,
      0
    );
    return { totalOriginal, totalDiscounted };
  };

  const { totalOriginal, totalDiscounted } = calculateTotal();

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!selectedAddress) {
    return <div>No address selected!</div>;
  }

  return (
    <div>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4 mb-4">
              <ul className="list-unstyled mb-0 product-list">
                {items.map((item) => {
                  if (!item.productId || !item.productId.price) {
                    return (
                      <li key={item._id}>
                        <p>Product data unavailable</p>
                      </li>
                    );
                  }

                  const discountedPrice = calculateDiscountedPrice(
                    item.productId.price
                  );
                  const itemTotal = calculateItemTotal(
                    item.productId.price,
                    item.quantity
                  );
                  const isUpdating = updatingItems[item.productId._id];

                  return (
                    <li key={item._id}>
                      <div className="d-flex product-card gap-4 mb-4">
                        <div className="product-card-img">
                          <img
                            className="rounded-4"
                            src={item.productId.productImageURL}
                            alt={item.productId.title}
                            onError={(e) =>
                              (e.target.src = "/placeholder-image.jpg")
                            }
                          />
                        </div>
                        <div className="d-flex align-items-start justify-content-between flex-grow-1 cart-content">
                          <div>
                            <h3>{item.productId.title}</h3>
                            <p>
                              <span className="fs-4 fw-bolder">
                                ₹{discountedPrice.toFixed(2)}
                              </span>{" "}
                              <span className="fs-4 text-black-50 ms-3">
                                <del>₹{item.productId.price}</del>
                              </span>
                            </p>
                            <p>
                              Item Total:
                              <span className="fw-bold ms-2">
                                ₹{itemTotal.discounted.toFixed(2)}
                              </span>
                              <span className="text-black-50 ms-2">
                                <del>₹{itemTotal.original.toFixed(2)}</del>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card p-4">
              <h4>Delivery Address:</h4>
              <p className="mb-0">
                {selectedAddress.fullName} - {selectedAddress.address},{" "}
                {selectedAddress.city}, {selectedAddress.state}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5>Cart Summary</h5>
                  <hr />
                  <p>Original Total: ₹{totalOriginal.toFixed(2)}</p>
                  <p>Discounted Total: ₹{totalDiscounted.toFixed(2)}</p>
                  <p>
                    Savings: ₹{(totalOriginal - totalDiscounted).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary btn-bg-red cursor-pointer rounded-pill"
                    onClick={handleCheckout} 
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
