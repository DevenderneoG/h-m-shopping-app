import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetails } from "./productSlice";
import { useEffect, useState } from "react";
import { addToCart, fetchCart } from "./cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { addWishList, fetchWishlist } from "./wishlistSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector(
    (state) => state.product
  );

  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
  } = useSelector(
    (state) => state.wishlist || { items: [], status: "idle", error: null }
  );

  useEffect(() => {
    dispatch(fetchProductsDetails(productId));
    dispatch(fetchWishlist());
  }, [dispatch, productId]);

  const getStarColor = (index) => {
    if (selectedProduct?.rating >= index + 1) {
      return "gold";
    } else if (
      selectedProduct?.rating > index &&
      selectedProduct?.rating < index + 1
    ) {
      return "gray";
    } else {
      return "gray";
    }
  };

  // const discount = 50;
  // const discountPrice =
  //   selectedProduct?.price - (selectedProduct?.price * discount) / 100;

  const discount = selectedProduct?.discount || 0;
  const discountPrice = selectedProduct?.price
    ? selectedProduct.price - (selectedProduct.price * discount) / 100
    : 0;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addToCart({
          productId: selectedProduct._id,
          quantity,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Product added to cart successfully!", {
            position: "top-right",
            autoClose: 3000,
          });

          dispatch(fetchCart());
        })
        .catch((err) => {
          toast.error("Failed to add product to cart!", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const isProductInWishlist = () => {
    return (
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item.productId?._id === selectedProduct?._id)
    );
  };

  const handleAddToWishlist = () => {
    if (isProductInWishlist()) {
      toast.info("Product already in wishlist!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (selectedProduct) {
      dispatch(addWishList({ productId: selectedProduct._id }))
        .unwrap()
        .then(() => {
          toast.success("Product added to wishlist successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          dispatch(fetchWishlist());
        })
        .catch((err) => {
          toast.error("Failed to add product to wishlist!", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-center">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              {selectedProduct && (
                <div
                  className="card border-0 rounded-0 product-card mb-lg-0 mb-4"
                  key={selectedProduct._id}
                >
                  <div className="position-relative">
                    <img
                      src={
                        selectedProduct.productImageURL ||
                        "https://example.com/default-image"
                      }
                      className="card-img-top rounded-4"
                      alt="card-image"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-7">
              <div>
                <h2>{selectedProduct.title}</h2>
                <p className="fs-4 fw-bold">
                  {selectedProduct.rating}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={getStarColor(index)}
                      className="star-icon"
                    >
                      <path d="M12 2L15 8l6 .5-4.5 4.5 1.5 6-5.5-3-5.5 3 1.5-6-4.5-4.5L9 8l3-6z" />
                    </svg>
                  ))}
                </p>

                <div className="d-flex align-items-center">
                  <span className="fs-2 fw-bolder">
                    ₹{discountPrice.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <span className="fs-4 text-black-50 ms-3">
                      <del>₹{selectedProduct.price}</del>
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <h3 className="fs-4 fw-bold text-black-50">
                    {discount}% off
                  </h3>
                )}

                <div className="mb-3">
                  <span className="mb-2 d-block">Quantity:</span>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      min="1"
                      className="form-control text-center"
                      style={{ width: "60px" }}
                    />
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <p>Sizes</p>
                  <ul className="size-list d-flex gap-3 list-unstyled">
                    {selectedProduct.sizes &&
                    selectedProduct.sizes.length > 0 ? (
                      selectedProduct.sizes.map((size) => (
                        <li key={size}>
                          <button className="btn btn-outline-dark">
                            {size}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>No Sizes Available</li>
                    )}
                  </ul>
                </div>
                <div className="mb-5 d-flex flex-lg-row flex-column align-content-center gap-3">
                  <button
                    className="btn btn-primary btn-bg-red cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-info cursor-pointer"
                    onClick={handleAddToWishlist}
                    disabled={wishlistStatus === "loading"}
                  >
                    {isProductInWishlist()
                      ? "In Wishlist"
                      : wishlistStatus === "loading"
                      ? "Adding..."
                      : "Add to Wishlist"}
                  </button>
                </div>
                <hr />
                <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap py-4">
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 256 256"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,.7-3.25Z"
                          opacity="0.2"
                        ></path>
                        <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
                      </svg>
                    </div>
                    <h3>10 days Returnable</h3>
                  </div>
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M24.039 6c-4.517 0-8.632 1.492-11.067 2.711q-.33.165-.616.322c-.378.206-.7.398-.956.567l2.77 4.078l1.304.519c5.096 2.571 11.93 2.571 17.027 0l1.48-.768L36.6 9.6a16 16 0 0 0-1.689-.957C32.488 7.437 28.471 6 24.04 6m-6.442 4.616a25 25 0 0 1-2.901-.728C16.978 8.875 20.377 7.8 24.04 7.8c2.537 0 4.936.516 6.92 1.17c-2.325.327-4.806.882-7.17 1.565c-1.86.538-4.034.48-6.192.081m15.96 5.064l-.246.124c-5.606 2.828-13.042 2.828-18.648 0l-.233-.118C6.008 24.927-.422 41.997 24.039 41.997S41.913 24.61 33.557 15.68M23 24a2 2 0 1 0 0 4zm2-2v-1h-2v1a4 4 0 0 0 0 8v4c-.87 0-1.611-.555-1.887-1.333a1 1 0 1 0-1.885.666A4 4 0 0 0 23 36v1h2v-1a4 4 0 0 0 0-8v-4c.87 0 1.611.555 1.887 1.333a1 1 0 1 0 1.885-.666A4 4 0 0 0 25 22m0 8v4a2 2 0 1 0 0-4"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3>Pay on Delivery</h3>
                  </div>
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M9.207 16.455C9.207 17.86 8.095 19 6.724 19s-2.483-1.14-2.483-2.546m4.966 0c0-1.405-1.112-2.545-2.483-2.545s-2.483 1.14-2.483 2.545m4.966 0h5.586m-10.552 0H3V6a1 1 0 0 1 1-1h9.793a1 1 0 0 1 1 1v2.182m5.586 8.272c0 1.406-1.111 2.546-2.482 2.546s-2.483-1.14-2.483-2.546m4.965 0c0-1.405-1.111-2.545-2.482-2.545s-2.483 1.14-2.483 2.545m4.965 0H21v-5.09l-2.515-2.579a2 2 0 0 0-1.431-.603h-2.26m.62 8.272h-.62m0 0V8.182"
                        />
                      </svg>
                    </div>
                    <h3>Free Delivery</h3>
                  </div>
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M512 80c8.8 0 16 7.2 16 16l0 32L48 128l0-32c0-8.8 7.2-16 16-16l448 0zm16 144l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192 480 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z" />
                      </svg>
                    </div>
                    <h3>Secure Payment</h3>
                  </div>
                </div>
                <hr />
                <div className="mb-3 pt-3">
                  <h4 className="mb-3">Description</h4>
                  <ul>
                    {selectedProduct.productDescription &&
                    selectedProduct.productDescription > 0 ? (
                      selectedProduct.productDescription.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))
                    ) : (
                      <li>No Description Available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
