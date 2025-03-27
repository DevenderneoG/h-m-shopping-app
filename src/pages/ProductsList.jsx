import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProducts,
  fetchCategories,
  setSelectedCategories,
} from "./productSlice";
import { addWishList, fetchWishlist } from "./wishlistSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addToCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const {
    products,
    categories,
    status: productStatus,
    error: productError,
    selectedCategories,
    searchTerm,
  } = useSelector((state) => state.product);
  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
  } = useSelector((state) => state.wishlist);

  const [selectedRating, setSelectedRating] = React.useState(null);
  const [sortPrice, setSortPrice] = React.useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchWishlist()); 

    if (category) {
      dispatch(setSelectedCategories([category]));
    }
  }, [dispatch, category]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((cat) => cat !== value);
    dispatch(setSelectedCategories(updatedCategories));
  };

  const handleRatingChange = (e) => {
    setSelectedRating(Number(e.target.value));
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const ratingMatch =
      selectedRating === null || product.rating >= selectedRating;
    const searchMatch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && ratingMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") return a.price - b.price;
    if (sortPrice === "highToLow") return b.price - a.price;
    return 0;
  });

  const handleClear = () => {
    dispatch(setSelectedCategories([]));
    setSelectedRating(null);
    setSortPrice(null);
  };

  const isProductInWishlist = (productId) => {
    return (
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item.productId._id === productId)
    );
  };
 

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
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-2">
            <div className="sticky-top categories-sidebar">
              <div className="d-flex align-items-center justify-content-between mb-4 sticky-top">
                <h6 className="fw-bolder">Filters</h6>
                <button onClick={handleClear} className="bg-transparent border-0 text-decoration-underline">Clear</button>
              </div>
              <hr />
              <div className="mb-4">
                <h6 className="fw-bolder">Category</h6>

                <ul className="list-unstyled">
                  {categories.map((category) => (
                    <li key={category.id} className="mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={category}
                          id={`category-${category.id}`}
                          onChange={handleCategoryChange}
                          checked={selectedCategories.includes(category)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`category-${category.id}`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mb-4">
                <h6 className="fw-bolder">Rating</h6>
                <ul className="list-unstyled category-list">
                  {[4, 3, 2, 1].map((rating) => (
                    <li className="mb-2" key={rating}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value={rating}
                          id={`rating-${rating}`}
                          onChange={handleRatingChange}
                          checked={selectedRating === rating}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`rating-${rating}`}
                        >
                          {rating} Stars & above
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="mb-4">
                <h6 className="fw-bolder">Sort by Price</h6>
                <ul className="list-unstyled category-list">
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="price"
                        value="lowToHigh"
                        id="lowToHigh"
                        onChange={() => setSortPrice("lowToHigh")}
                        checked={sortPrice === "lowToHigh"}
                      />
                      <label className="form-check-label" htmlFor="lowToHigh">
                        Low to High
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="price"
                        value="highToLow"
                        id="highToLow"
                        onChange={() => setSortPrice("highToLow")}
                        checked={sortPrice === "highToLow"}
                      />
                      <label className="form-check-label" htmlFor="highToLow">
                        High to Low
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-10 ps-4">
            <div>
              {/* <h2 className="mb-4">View All</h2> */}
              <div className="text-center">
                {productStatus === "loading" && (
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {productError && <p>{productError}</p>}
                {searchTerm && filteredProducts.length === 0 && (
                  <p>No products found matching "{searchTerm}"</p>
                )}
              </div>
              <div className="d-flex flex-lg-row flex-md-row flex-column flex-wrap gap-1 row-gap-3 product-list mt-lg-0 mt-4">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <div
                      className="card border-0 rounded-0 product-card"
                      key={product._id}
                    >
                      <a href={`/products/${product.category}/${product._id}`}>
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
                        <p className="card-text fw-bold">₹ {product.price}</p>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-primary btn-bg-red cursor-pointer"
                            onClick={() => handleAddToWishlist(product._id)}
                            disabled={wishlistStatus === "loading"}
                          >
                            {isProductInWishlist(product._id)
                              ? "In Wishlist"
                              : wishlistStatus === "loading"
                              ? "Adding..."
                              : "Add to Wishlist"}
                          </button>
                        </div>
                        {wishlistError && (
                          <p className="text-danger">{wishlistError}</p>
                        )}
                        <div className="d-flex gap-2 mt-2">
                          <button
                            className="btn btn-primary btn-bg-red cursor-pointer"
                            onClick={() => handleAddToCart(product._id)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center d-block">No products found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsList;
