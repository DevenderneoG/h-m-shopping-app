import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetails } from "./productSlice";
import { useEffect, useState } from "react";
import { addToCart } from "./cartSlice"; 

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductsDetails(productId));
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

  const discount = 50;
  const discountPrice =
    selectedProduct?.price - (selectedProduct?.price * discount) / 100;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addToCart({
          ...selectedProduct,
          quantity,
        })
      );
    }
  };
  console.log(selectedProduct);
  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              {selectedProduct && (
                <div
                  className="card border-0 rounded-0 product-card"
                  key={selectedProduct._id}
                >
                  <div className="position-relative">
                    <img
                      src={
                        selectedProduct.productImageURL ||
                        "https://example.com/default-image"
                      }
                      className="card-img-top rounded-0"
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
                  <span className="fs-2 fw-bolder">₹{discountPrice}</span>
                  {""}
                  <span className="fs-4 text-black-50 ms-3">
                    <del>₹{selectedProduct.price}</del>
                  </span>
                </div>
                <h3 className="fs-4 fw-bold text-black-50">50% off</h3>
                <div className="mb-3">
                  <span className="mb-2">Quantity:</span>
                  <div>
                    <button onClick={() => handleQuantityChange(quantity - 1)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value))
                      }
                    />
                    <button onClick={() => handleQuantityChange(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <p>Sizes</p>
                  <ul className="size-list d-flex gap-3 list-unstyled">
                    <li>
                      <button>S</button>
                    </li>
                    <li>
                      <button>M</button>
                    </li>
                    <li>
                      <button>L</button>
                    </li>
                    <li>
                      <button>XL</button>
                    </li>
                    <li>
                      <button>XXL</button>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z" />
                      </svg>
                    </div>
                    <h3>10 days Returnable</h3>
                  </div>
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z" />
                      </svg>
                    </div>
                    <h3>Pay on Delivery</h3>
                  </div>
                  <div className="delivery-card text-center">
                    <div className="delivery-icon mb-3 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
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
                <div className="mb-3">
                  <h4 className="mb-3">Description</h4>
                  <p>
                    STYLE REDEFINED: Elevate your look with our versatile Bomber
                    Jacket.
                  </p>
                  <p>
                    STYLE REDEFINED: Elevate your look with our versatile Bomber
                    Jacket.
                  </p>
                  <p>
                    STYLE REDEFINED: Elevate your look with our versatile Bomber
                    Jacket.
                  </p>
                  <p>
                    STYLE REDEFINED: Elevate your look with our versatile Bomber
                    Jacket.
                  </p>
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
