import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "./cartSlice";
import { fetchWishlist, addWishList } from "./wishlistSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartComponent = () => {
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

  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
  } = useSelector(
    (state) => state.wishlist || { items: [], status: "idle", error: null }
  );

  // Local state to track updating items
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  // const handleAddToCart = () => {
  //   dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
  // };

  const handleRemoveFromCart = (productId) => {
    if (!cartId) return;
    dispatch(removeFromCart({ cartId, productId }))
    .then(() => toast.success("Product Removed successfully"))
      .catch((err) => {
        toast.error("Product Failed Removed", err);        
      })
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (!cartId) {
      console.error("Cart ID is not available");
      return;
    }
    const updatedQuantity = Math.max(1, newQuantity);
    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));

    dispatch(updateCartItem({ cartId, productId, quantity: updatedQuantity }))
      .unwrap()
      .then(() => toast.success("Quantity updated successfully"))
      .catch((err) => {
        toast.error(err);
        if (err === "Cart not found" || err === "Product not found in cart") {
          dispatch(fetchCart()); // Refresh cart if not found
        }
      })
      .finally(() => {
        setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
      });
  };

  // const handleAddToWishlist = (productId) => {
  //   dispatch(addWishList({ productId }));
  // };


  const handleAddToWishlist = (productId) => {
      if (isProductInWishlist(productId)) {
        toast.info("Product already in wishlist!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
  
      dispatch(addWishList({ productId })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Product added to wishlist successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (result.meta.requestStatus === "rejected") {
          toast.error("Failed to add product to wishlist!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
    };

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

  const isProductInWishlist = (productId) => {
    return (
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item.productId?._id === productId)
    );
  };

  return (
    <div className="cart-page">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="text-center">
        {status === "loading" && (
          <div
            className="spinner-border text-danger mt-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      {status === "failed" && (
        <p className="text-danger">
          Cart Error: {error || "Unable to load cart"}
        </p>
      )}
      {wishlistStatus === "failed" && (
        <p className="text-danger">
          Wishlist Error: {wishlistError || "Unable to load wishlist"}
        </p>
      )}
      {status === "succeeded" && items.length === 0 && (
        <p>Your cart is empty</p>
      )}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4">
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
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <button
                                type="button"
                                className="btn btn-outline-dark decreaseNumber"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId._id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={isUpdating || item.quantity <= 1}
                              >
                                -
                              </button>
                              <div>
                                {isUpdating ? "Updating..." : item.quantity}
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-dark increaseNumber"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId._id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={isUpdating}
                              >
                                +
                              </button>
                            </div>
                            <p>
                              Item Total:
                              <span className="fw-bold ms-2">
                                ₹{itemTotal.discounted.toFixed(2)}
                              </span>
                              <span className="text-black-50 ms-2">
                                <del>₹{itemTotal.original.toFixed(2)}</del>
                              </span>
                            </p>
                            <button
                              className="btn btn-primary btn-bg-red cursor-pointer"
                              onClick={() =>
                                handleAddToWishlist(item.productId._id)
                              }
                              disabled={wishlistStatus === "loading"}
                            >
                              {isProductInWishlist(item.productId._id)
                                ? "In Wishlist"
                                : wishlistStatus === "loading"
                                ? "Adding..."
                                : "Add to Wishlist"}
                            </button>
                          </div>
                          <div
                            className="deletebtn"
                            onClick={() =>
                              handleRemoveFromCart(item.productId._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none">
                                <path
                                  fill="currentColor"
                                  d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                  <a
                    href="./address"
                    className="btn btn-primary btn-bg-red cursor-pointer"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartComponent;
