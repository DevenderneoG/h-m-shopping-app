import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  setSelectedCategories,
} from "./productSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, categories, status, error, selectedCategories } =
    useSelector((state) => state.product);

  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((category) => category !== value);
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

    return categoryMatch && ratingMatch;
  });
  console.log(selectedRating);
  console.log(filteredProducts);

  const handleClear = () => {
    dispatch(setSelectedCategories([]));
    setSelectedRating(null);
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-2">
            <div className="sticky-top categories-sidebar">
              <div className="d-flex align-items-center justify-content-between mb-4 sticky-top">
                <h6 className="fw-bolder">Filters</h6>
                <button onClick={handleClear}>Clear</button>
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
                        name="rating"
                      />
                      <label
                        className="form-check-label"
                      >
                        low to high
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                      />
                      <label
                        className="form-check-label"
                      >
                        high to low
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-10 ps-4">
            <div className="">
              <h2 className="mb-4">View All</h2>
              <div className="d-flex flex-lg-row flex-column flex-wrap gap-1 row-gap-3 product-list">
                {status === "loading" && (
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {error && <p>{error}</p>}

                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="card border-0 rounded-0 product-card"
                      key={product._id}
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
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.price}</p>
                        {/* <p className="card-text">{product.rating}</p> */}
                        <div className="d-flex gap-2">
                          <a className="btn btn-primary btn-bg-red cursur-pointer">
                            Add To Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
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
