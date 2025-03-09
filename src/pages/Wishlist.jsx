import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, addWishList, removeWishList } from "../pages/wishlistSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems, status: wishlistStatus, error: wishlistError, wishlistId } = useSelector(
    (state) => state.wishlist
  );

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

  const handleAddToWishlist = (productId) => {
    dispatch(addWishList({ productId }))
      .unwrap()
      .then(() => console.log("Added successfully"))
      .catch((err) => console.error("Add failed:", err));
  };

  const handleRemoveFromWishlist = (productId) => {
    if (!wishlistId) {
      console.error("Wishlist ID not found");
      return;
    }
    dispatch(removeWishList({ wishlistId, productId }))
      .unwrap()
      .then(() => console.log("Removed successfully"))
      .catch((err) => console.error("Remove failed:", err));
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5 overflow-hidden">
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
            {wishlistError && <p className="text-danger text-center">{wishlistError}</p>}
            <div className="d-grid gap-1 row-gap-3 product-list">
              {uniqueWishlistItems.length > 0 ? (
                uniqueWishlistItems.map((group) => (
                  <div className="card border-0 rounded-0 product-card" key={group.product._id}>
                    <a href={`/products/${group.product.category}/${group.product._id}`}>
                      <img
                        src={group.product.productImageURL || "https://example.com/default-image"}
                        className="card-img-top rounded-0"
                        alt={group.product.title || "Product"}
                      />
                    </a>
                    <div className="card-body">
                      <a
                        href={`/products/${group.product.category}/${group.product._id}`}
                        className="text-decoration-none text-black"
                      >
                        <h5 className="card-title">{group.product.title || "Untitled"}</h5>
                      </a>
                      <p className="card-text fw-bold">₹ {group.product.price || "N/A"}</p>
                      <p className="card-text">Quantity: {group.quantity}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromWishlist(group.product._id)}
                        disabled={wishlistStatus === "loading"}
                      >
                        Remove
                      </button>
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