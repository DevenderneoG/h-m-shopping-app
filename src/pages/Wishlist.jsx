import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeWishList } from "../pages/wishlistSlice";
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

  // Group wishlist items by productId._id and calculate quantities
  const groupedWishlist = Array.isArray(wishlistItems)
    ? wishlistItems.reduce((acc, item) => {
        const productId = item.productId._id;
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

  console.log("Grouped Wishlist:", groupedWishlist);
  const uniqueWishlistItems = Object.values(groupedWishlist);

  const handleRemoveFromWishlist = (productId) => {
    if (wishlistId) {
      console.log(`Removing product with ID ${productId} from wishlist ${wishlistId}`);
      dispatch(removeWishList({ wishlistId, productId }));
    } else {
      console.error("Wishlist ID not found");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="mb-4">Your Wishlist</h2>
            <div className="text-center">
              {wishlistStatus === "loading" && (
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {wishlistError && <p className="text-danger">{wishlistError}</p>}
            </div>
            <div className="d-flex flex-lg-row flex-column flex-wrap gap-1 row-gap-3 product-list">
              {uniqueWishlistItems.length > 0 ? (
                uniqueWishlistItems.map((group) => (
                  <div
                    className="card border-0 rounded-0 product-card"
                    key={group.product._id}
                  >
                    <a href={`/products/${group.product.category}/${group.product._id}`}>
                      <div className="position-relative">
                        <img
                          src={
                            group.product.productImageURL ||
                            "https://example.com/default-image"
                          }
                          className="card-img-top rounded-0"
                          alt={group.product.title}
                        />
                      </div>
                    </a>
                    <div className="card-body">
                      <a
                        href={`/products/${group.product.category}/${group.product._id}`}
                        className="text-decoration-none text-black"
                      >
                        <h5 className="card-title">{group.product.title}</h5>
                      </a>
                      <p className="card-text fw-bold">₹ {group.product.price}</p>
                      <p className="card-text">Quantity: {group.quantity}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromWishlist(group.product._id)} // Pass productId
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