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

  const calculateDiscountedPrice = (price, discount = 0) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const calculateItemTotal = (price, quantity, discount = 0) => {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    return {
      original: price * quantity,
      discounted: discountedPrice * quantity,
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
        calculateDiscountedPrice(
          item.productId?.price || 0,
          item.productId?.discount || 0
        ) *
          item.quantity,
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
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card p-4 mb-4">
              <ul className="list-unstyled mb-0 product-list checkout-list">
                {items.map((item) => {
                  if (!item.productId || !item.productId.price) {
                    return (
                      <li key={item._id}>
                        <p>Product data unavailable</p>
                      </li>
                    );
                  }

                  const discount = item.productId.discount || 0;
                  const itemTotal = calculateItemTotal(
                    item.productId.price,
                    item.quantity,
                    discount
                  );
                  const isUpdating = updatingItems[item.productId._id];

                  return (
                    <li key={item._id}>
                      <div className="d-flex product-card checkout-card gap-4 mb-4 pb-4 border-bottom">
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
                            <p className="mb-0">
                              <span className="fs-4 fw-bolder">
                                ₹{itemTotal.discounted.toFixed(2)}
                              </span>{" "}
                            </p>
                            <p className="mb-0">{item.description}</p>
                            <p>
                              <span className="fs-5">
                                <b>Quantity: </b>
                                {item.quantity}
                              </span>{" "}
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
              <hr />
              <h5 className="fw-semibold">{selectedAddress.fullName}</h5>
              <p className="mb-0">
                {selectedAddress.address}, {selectedAddress.city},{" "}
                {selectedAddress.state}
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="fw-semibold">Cart Summary</h4>
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
