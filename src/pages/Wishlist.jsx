import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeWishList,
} from "../pages/wishlistSlice";
import { addToCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
    wishlistId,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlist());
    }
  }, [dispatch, wishlistStatus]);

  const groupedWishlist = Array.isArray(wishlistItems)
    ? wishlistItems.reduce((acc, item) => {
        const productId = item?.productId?._id;
        if (!productId) return acc;
        if (!acc[productId]) {
          acc[productId] = {
            product: item.productId,
            quantity: 0,
            itemIds: [],
          };
        }
        acc[productId].quantity += 1;
        acc[productId].itemIds.push(item._id);
        return acc;
      }, {})
    : {};

  const uniqueWishlistItems = Object.values(groupedWishlist);  

  const handleRemoveFromWishlist = (productId) => {
    if (!wishlistId) {
      console.error("Wishlist ID not found");
      return;
    }
    dispatch(removeWishList({ wishlistId, productId }))
      .unwrap()
      .then(() => toast.success("Product Removed successfully"))
      .catch((err) => toast.error("Remove failed:", err));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Product added to cart successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (result.meta.requestStatus === "rejected") {
        toast.error("Failed to add product to cart!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container py-5 overflow-hidden">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="mb-4 text-center fw-bolder">Your Wishlist</h2>
            {wishlistStatus === "loading" && (
              <div className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {wishlistError && (
              <p className="text-danger text-center">{wishlistError}</p>
            )}
            <div className="d-grid gap-3 row-gap-3 product-list wishlist-list">
              {uniqueWishlistItems.length > 0 ? (
                uniqueWishlistItems.map((group) => (
                  <div
                    className="card border-0 rounded-0"
                    key={group.product._id}
                  >
                    <a
                      href={`/products/${group.product.category}/${group.product._id}`}
                    >
                      <img
                        src={
                          group.product.productImageURL ||
                          "https://example.com/default-image"
                        }
                        className="card-img-top rounded-4"
                        alt={group.product.title || "Product"}
                      />
                    </a>
                    <div className="card-body">
                      <a
                        href={`/products/${group.product.category}/${group.product._id}`}
                        className="text-decoration-none text-black"
                      >
                        <h5 className="card-title">
                          {group.product.title || "Untitled"}
                        </h5>
                      </a>
                      <p className="card-text fw-bold">
                        ₹ {group.product.price || "N/A"}
                      </p>
                      <p className="card-text">Quantity: {group.quantity}</p>
                      <div className="d-flex align-center flex-lg-nowrap flex-md-nowrap flex-wrap">
                        <button
                          className="btn btn-primary btn-bg-red cursor-pointer mb-lg-0 mb-md-0 mb-3 rounded-pill w-100"
                          onClick={() => handleAddToCart(group.product._id)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="btn btn-danger rounded-pill ms-lg-2 ms-md-2  btn-delete w-100"
                          onClick={() =>
                            handleRemoveFromWishlist(group.product._id)
                          }
                          disabled={wishlistStatus === "loading"}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center d-block">Your wishlist is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
