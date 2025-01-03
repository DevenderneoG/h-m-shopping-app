import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const ProductsList = () => {
  const categoriesId = useParams();
  const { data, loading, error } = useFetch(
    `https://shoping-app-backend-iota.vercel.app/categories/${categoriesId.category}`
  );

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="fw-bolder">Filters</h6>
              <span>Clear</span>
            </div>
            <hr />
            <div className="mb-4">
              <h6 className="fw-bolder">Rating</h6>
              <label
                htmlFor="customPriceRange"
                className="form-label d-flex align-items-center justify-content-between"
              >
                <span>0 </span> <span>5 </span>
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="5"
                step="0"
                id="customPriceRange"
                list="priceTickmarks"
              />

              <datalist id="priceTickmarks">
                <option value="0" label="0"></option>
                <option value="3" label="1000"></option>
                <option value="5" label="2000"></option>
              </datalist>
            </div>
            <hr />
            <div className="mb-4">
              <h6 className="fw-bolder">Category</h6>
              <ul className="list-unstyled category-list">
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Mens
                    </label>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Women
                    </label>
                  </div>
                  <a href="#" className=""></a>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Kids
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <hr />
            <div className="mb-4">
              <h6 className="fw-bolder">Rating</h6>
              <ul className="list-unstyled category-list">
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      4 Starts & above
                    </label>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      3 Starts & above
                    </label>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      2 Starts & above
                    </label>
                  </div>
                  <a href="#" className=""></a>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      1 Starts & above
                    </label>
                  </div>
                  <a href="#" className=""></a>
                </li>
              </ul>
            </div>
            {/* <hr />
            <div className="mb-4">
              <h6 className="fw-bolder">Rating</h6>
              <ul className="list-unstyled category-list">
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Price - Low to High
                    </label>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Price - High to Low
                    </label>
                  </div>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="col-lg-10 ps-4">
            <div className="">
              <h2 className="mb-4">View All</h2>
              <div className="d-flex flex-lg-row flex-column flex-wrap gap-1 row-gap-3 product-list">
                {loading && (
                  <div class="spinner-border text-danger d-flex justify-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                )}
                {data?.data?.category?.map((product) => (
                  <div className="card border-0 rounded-0" key={product.id}>
                    <div className="position-relative">
                      <img
                        src={
                          product.productImageURL ||
                          "https://collection.cloudinary.com/doctl427o/b1a9096963980a438b721bc1e5ace532?"
                        }
                        className="card-img-top rounded-0"
                        alt="card-image"
                      />
                      <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                        <svg
                          role="img"
                          aria-hidden="true"
                          focusable="false"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                        >
                          <path
                            fill="#fff"
                            d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                          ></path>
                          <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.price}</p>
                      <div className="d-flex gap-2">
                        <a href="#" className="btn btn-primary btn-bg-red">
                          Add To Cart
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="card border-0 rounded-0">
                  <div className="position-relative">
                    <img
                      src="https://image.hm.com/assets/hm/df/61/df6179b499b47d50f36cf713a8cef99728dc5ddd.jpg?imwidth=564"
                      className="card-img-top rounded-0"
                      alt="card-image"
                    />
                    <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                      >
                        <path
                          fill="#fff"
                          d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                        ></path>
                        <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Slim Fit Twill joggers</h5>
                    <p className="card-text">Rs.2,299.00</p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="btn btn-primary btn-bg-red rounded-pill"
                      >
                        Add To Cart
                      </a>                     
                    </div>
                  </div>
                </div>
                <div className="card border-0 rounded-0">
                  <div className="position-relative">
                    <img
                      src="https://image.hm.com/assets/hm/09/7a/097a5016725dd53b163c913978fd14bdc39b8f84.jpg?imwidth=564"
                      className="card-img-top rounded-0"
                      alt="card-image"
                    />
                    <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                      >
                        <path
                          fill="#fff"
                          d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                        ></path>
                        <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Loose Fit Printed T-shirt</h5>
                    <p className="card-text">Rs.799.00</p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="btn btn-primary btn-bg-red rounded-pill"
                      >
                        Add To Cart
                      </a>                     
                    </div>
                  </div>
                </div>
                <div className="card border-0 rounded-0">
                  <div className="position-relative">
                    <img
                      src="https://image.hm.com/assets/hm/69/63/69634bc56cd7d78fb3681b27fc44159385fd5a83.jpg?imwidth=564"
                      className="card-img-top rounded-0"
                      alt="card-image"
                    />
                    <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                      >
                        <path
                          fill="#fff"
                          d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                        ></path>
                        <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Loose Fit T-shirt</h5>
                    <p className="card-text">Rs.1,299.00</p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="btn btn-primary btn-bg-red rounded-pill"
                      >
                        Add To Cart
                      </a>                     
                    </div>
                  </div>
                </div>
                <div className="card border-0 rounded-0">
                  <div className="position-relative">
                    <img
                      src="https://image.hm.com/assets/hm/69/7f/697f80d79a517a92d633e984771fc2d56750fbce.jpg?imwidth=564"
                      className="card-img-top rounded-0"
                      alt="card-image"
                    />
                    <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                      >
                        <path
                          fill="#fff"
                          d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                        ></path>
                        <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Loose Fit T-shirt</h5>
                    <p className="card-text">Rs.1,299.00</p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="btn btn-primary btn-bg-red rounded-pill"
                      >
                        Add To Cart
                      </a>                      
                    </div>
                  </div>
                </div>
                <div className="card border-0 rounded-0">
                  <div className="position-relative">
                    <img
                      src="https://image.hm.com/assets/hm/a4/03/a403ad96accd10ca0414e8840293f6165a0e59af.jpg?imwidth=564"
                      className="card-img-top rounded-0"
                      alt="card-image"
                    />
                    <button className="btn position-absolute top-0 end-0 mt-2 me-2 wishlist-btn">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                      >
                        <path
                          fill="#fff"
                          d="M8 4.12C7.479 2.82 6.019 1.5 4.5 1.5c-2.478 0-4 1.45-4 3.931C.5 8.707 8 14.5 8 14.5s7.5-5.793 7.5-9.07c0-2.48-1.522-3.93-4-3.93-1.52 0-2.979 1.32-3.5 2.62Z"
                        ></path>
                        <path d="M1.222 2.177C2.027 1.392 3.164 1 4.5 1c.903 0 1.754.39 2.435.931.412.327.776.72 1.065 1.144A5.275 5.275 0 0 1 9.064 1.93C9.745 1.39 10.596 1 11.5 1c1.336 0 2.473.392 3.278 1.177.807.787 1.222 1.91 1.222 3.254 0 .982-.55 2.068-1.262 3.086-.728 1.038-1.689 2.093-2.636 3.032a45.56 45.56 0 0 1-3.709 3.278l-.064.05-.017.014-.006.004L8 14.5l-.306.396-.006-.005-.017-.013-.064-.05a45.453 45.453 0 0 1-1.101-.902c-.71-.6-1.658-1.436-2.608-2.377-.947-.939-1.908-1.994-2.636-3.032C.55 7.499 0 6.413 0 5.43c0-1.344.415-2.467 1.222-3.254ZM8 14.5l-.306.396c.18.139.432.138.612 0L8 14.5Zm0-.638.01-.007a44.575 44.575 0 0 0 3.389-3.016c.927-.92 1.84-1.927 2.52-2.896C14.612 6.953 15 6.086 15 5.431c0-1.137-.346-1.979-.92-2.538C13.505 2.333 12.642 2 11.5 2c-.617 0-1.255.27-1.814.714-.558.444-.996 1.03-1.222 1.593a.5.5 0 0 1-.928 0c-.226-.563-.665-1.15-1.223-1.593C5.754 2.27 5.116 2 4.5 2c-1.142 0-2.005.333-2.58.893-.574.56-.92 1.401-.92 2.538 0 .655.388 1.523 1.081 2.512.68.97 1.593 1.977 2.52 2.896a44.576 44.576 0 0 0 3.39 3.016l.009.007Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Loose Fit T-shirt</h5>
                    <p className="card-text">Rs.1,299.00</p>
                    <div className="d-flex gap-2">
                      <a
                        href="#"
                        className="btn btn-primary btn-bg-red rounded-pill"
                      >
                        Add To Cart
                      </a>                     
                    </div>
                  </div>
                </div> */}
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
