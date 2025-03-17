import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWishlist } from "./../pages/wishlistSlice";
import { fetchCart } from "../pages/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistStatus = useSelector((state) => state.wishlist.status);

  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlist());
    }
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
  }, [dispatch, wishlistStatus, cartStatus]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
        <div className="container-fluid px-5">
          <a className="navbar-brand" href="/">
            <svg
              className="__2OnJ __2utV PH_l"
              viewBox="0 0 370 244"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              role="img"
              aria-labelledby="id-hm-logo-xlarge"
            >
              <title id="id-hm-logo-xlarge">H&amp;M</title>
              <path d="M259.895 7.413c13.424-6.618 20.087-5.737 20.232.946.19 8.7-1.098 20.23-2.016 28.604-4.983 45.423-13.32 82.543-13.954 129.19 21.94-56.802 40.345-96.278 64.03-144.909 7.53-15.47 12.325-12.593 18.503-15.343 24.082-10.715 24.984-4.133 21.837 8.95-11.686 48.552-41.54 201.376-46.114 224.907-1.328 6.807-8.715 3.923-10.644 1.26-8.57-11.85-18.225-12.036-17.14-19.919 5.37-39.233 24.71-137.666 29.75-160.863-25.719 52.696-52.37 118.566-66.053 155.914-2.907 7.931-8.188 7.35-11.48 1.546-4.63-8.15-13.61-12.312-15.093-21.943-4.702-30.628 5.37-89.003 6.773-125.936-13.994 40.342-37.49 118.67-47.782 154.057-4.256 14.643-18.382 12.253-14.627-2.018 15.642-59.389 49.326-164.425 63.915-202.198 3.427-8.874 12.406-8.569 19.863-12.245zM174.6.115c4.26 1.025 3.913 6.05 1.31 12.912-7.682 20.247-18.335 46.847-30.516 78.212 7.658-.874 11.811-1.17 11.811-1.17 10.994-1.358 13.041 4.139 9.946 9.99-2.466 4.664-5.436 1.554-15.724 16.89-5.796 8.642-15.259 10.924-20.515 12.076-12.662 33.523-26.23 70.916-39.415 110.77-1.919 5.804-7.524 4.532-9.209 2.174-6.192-8.647-10.758-8.933-15.558-15.927-.577-1.132-1.706-2.672-1.027-5.448 3.53-14.425 12.901-44.067 27.156-83.091-17.958 3.892-37.387 8.076-45.408 9.94-9.626 25.445-19.014 50.967-27.908 76.18-5.518 15.64-19.88 12.617-14.84-2.165 8.028-23.548 16.89-48.004 25.776-71.72-9.948-1.063-13.313-8.088-18.873-13.958-2.147-2.267-6.828-1.948-9.12-5.127-4.123-5.711-3.712-8.248 5.81-10.996a955.318 955.318 0 0137.464-9.998c16.09-41.524 30.63-77.144 38.38-96.151C90.114-1.138 105.514.226 99.664 14.674c-11.889 29.363-24.079 59.867-36.11 90.799a880.98 880.98 0 0144.748-8.87 2312.644 2312.644 0 0134.62-83.968c.845-1.937 3.31-4.678 5.878-5.118 8.092-1.385 21.251-8.498 25.8-7.402zm-27.552 190.077c1.265-.773 2.524-1.715 3.767-2.75a756.514 756.514 0 01-2.82-8.468 139.528 139.528 0 00-2.752 3.638c-5.386 7.396-2.197 10.028 1.805 7.58zm7.167-35.065c6.67-7.53-6.516-10.681-3.48.836.17.65.382 1.413.62 2.254a98.19 98.19 0 002.86-3.09zm6.941 22.695c6.602-5.721 12.908-.046 6.38 9.628-1.404 2.08-2.99 4.318-4.729 6.522a193.17 193.17 0 002.146 5.877c3.375 8.654-5.488 10.824-8.345 3.656-.25-.626-.51-1.297-.778-1.995-5.387 4.772-11.618 7.777-18.275 5.707-10.954-3.407-13.74-18.83-3.514-30.711 4.103-4.767 7.191-8.074 9.771-10.716a251.947 251.947 0 01-1.819-6.17c-1.328-4.81-2.527-10.416 2.287-16.13 9.027-10.712 29.971-1.203 19.377 15.289-2.552 3.972-5.535 7.724-8.647 11.527a979.555 979.555 0 003.26 10.18 78.304 78.304 0 012.886-2.664z"></path>
            </svg>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 pe-0">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="m11.271 11.978l3.872 3.873a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532c-2.73-2.73-7.17-2.73-9.898 0s-2.728 7.17 0 9.9a6.96 6.96 0 0 0 4.949 2.05a.5.5 0 0 0 0-1a5.96 5.96 0 0 1-4.242-1.757a6.01 6.01 0 0 1 0-8.486a6.004 6.004 0 0 1 8.484 0a6.01 6.01 0 0 1 0 8.486a.5.5 0 0 0 .034.738"
                      />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#212529"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                  </span>
                  <input
                    type="search"
                    className="form-control border-start-0"
                    placeholder="Search..."
                  />
                </div>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center gap-3">
            <li className="nav-item">
              <button className="btn btn-primary btn-bg-red cursur-pointer">
                Login
              </button>
            </li>
            <li className="nav-item position-relative">
              <Link to="/wishlist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                  />
                </svg>
              </Link>
              {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
                <span className="wishlistCount">{wishlistItems.length}</span>
              )}
            </li>
            <li className="nav-item position-relative">
              <Link to="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3.742 20.555C4.942 22 7.174 22 11.64 22h.72c4.466 0 6.699 0 7.899-1.445m-16.517 0c-1.2-1.446-.788-3.64.035-8.03c.585-3.12.877-4.681 1.988-5.603M3.742 20.555Zm16.517 0c1.2-1.446.788-3.64-.035-8.03c-.585-3.12-.878-4.681-1.989-5.603m2.024 13.633ZM18.235 6.922C17.125 6 15.536 6 12.361 6h-.722c-3.175 0-4.763 0-5.874.922m12.47 0Zm-12.47 0Z" />
                    <path strokeLinecap="round" d="M9 6V5a3 3 0 1 1 6 0v1" />
                  </g>
                </svg>
              </Link>
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span  className="wishlistCount">{cartItems.length}</span>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;