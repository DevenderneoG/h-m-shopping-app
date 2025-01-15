import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetails } from "./productSlice";
import { useEffect } from "react";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsDetails(productId));
  }, [dispatch, productId]);

  const getStarColor = (index) => {
    if (selectedProduct?.rating >= index + 1) {
      return "gold";
    } else if (selectedProduct?.rating > index && selectedProduct?.rating < index + 1) {
      return "gray";
    } else {
      return "gray";
    }
  };

  const discount = 50;
  const discountPrice = selectedProduct?.price - (selectedProduct?.price * discount / 100);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  console.log(selectedProduct)
  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              {selectedProduct && (
                <div className="card border-0 rounded-0 product-card" key={selectedProduct._id}>
                  <div className="position-relative">
                    <img
                      src={selectedProduct.productImageURL || "https://example.com/default-image"}
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
                  {''}
                  <span className="fs-4 text-black-50 ms-3">
                    <del>₹{selectedProduct.price}</del>
                  </span>
                </div>
                <h3 className="fs-4 fw-bold text-black-50">50% off</h3>
                <div className="mb-3">
                    <span className="mb-2">Quantity:</span>
                    <div>
                        <button>-</button>
                        <input type="number" />
                        <button>+</button>
                    </div>
                </div>
                <div className="mb-3">
                    <p>Sizes</p>
                    <ul>
                        <li><button>S</button></li>
                        <li><button>M</button></li>
                        <li><button>L</button></li>
                        <li><button>XL</button></li>
                        <li><button>XXL</button></li>
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
