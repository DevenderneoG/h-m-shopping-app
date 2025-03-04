// Wishlist.js
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
    _id: wishlistId
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlist());
    }
  }, [dispatch, wishlistStatus]);

  console.log("Current wishlistId:", wishlistId);

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

  const uniqueWishlistItems = Object.values(groupedWishlist);

  const handleRemove = async (productId) => {
    if (!wishlistId) {
      console.error("Wishlist ID is null, cannot remove item");
      return;
    }
    try {
      await dispatch(removeWishList({ 
        wishlistId,
        productId // Using productId._id
      })).unwrap();
      console.log("Item removed successfully");
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  if (wishlistStatus === "loading" || !wishlistId) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="mb-4">Your Wishlist</h2>
            <div className="d-flex flex-lg-row flex-column flex-wrap gap-1 row-gap-3 product-list">
              {wishlist.length > 0 ? (
                wishlist.map((product) => (
                  <div
                    className="card border-0 rounded-0 product-card"
                    key={group.product._id}
                  >
                    <a
                      href={`/products/${group.product.category}/${group.product._id}`}
                    >
                      <div className="position-relative">
                        <img
                          src={
                            product.productImageURL ||
                            "https://example.com/default-image"
                          }
                          className="card-img-top rounded-0"
                          alt="card-image"
                        />
                      </div>
                    </a>
                    <div className="card-body">
                      <a
                        href={`/products/${product.category}/${product._id}`}
                        className="text-decoration-none text-black"
                      >
                        <h5 className="card-title">{product.title}</h5>
                      </a>
                      <p className="card-text fw-bold">
                        ₹ {group.product.price}
                      </p>
                      <p className="card-text">Quantity: {group.quantity}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(group.product._id)} // Use productId._id
                        disabled={wishlistStatus === "loading"}
                      >
                        {wishlistStatus === "loading" ? "Removing..." : "Remove"}
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