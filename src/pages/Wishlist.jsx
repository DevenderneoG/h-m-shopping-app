// Wishlist.js
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.product);

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="mb-4">Your Wishlist</h2>
            <div className="d-flex flex-lg-row flex-column flex-wrap gap-1 row-gap-3 product-list">
              {wishlist.length > 0 ? (
                wishlist.map((product) => (
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