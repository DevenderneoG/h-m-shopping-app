import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWishlist } from "./../pages/wishlistSlice";
import { fetchCart } from "../pages/cartSlice";
import { fetchUser } from "./../components/userSlice";
import { setSearchTerm } from "../pages/productSlice"; 

const Header = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status); 
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const currentUser = users.length > 0 ? users[0] : null; 

  const [searchQuery, setSearchQuery] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlist());
    }
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, wishlistStatus, cartStatus, userStatus]);

  
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearchTerm(query)); 
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white sticky-top shadow">
        <div className="container-fluid px-lg-5 px-4">
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
            <ul className="navbar-nav mb-2 mb-lg-0 w-100 searchBar d-lg-block d-none">
              <li className="nav-item">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 pe-0">
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
                        d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z"
                        opacity="0.2"
                      ></path>
                      <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </span>
                  <input
                    type="search"
                    className="form-control border-start-0"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </li>
            </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center flex-row gap-4">
            <li className="nav-item position-relative header-icon">
              <Link to="/wishlist">
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
                    d="M208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192Z"
                    opacity="0.2"
                  ></path>
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </Link>
              {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
                <span className="wishlistCount">{wishlistItems.length}</span>
              )}
            </li>
            <li className="nav-item position-relative header-icon">
              <Link to="/cart">
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
                    d="M232,72l-25.63,92.28A16,16,0,0,1,191,176H92.16a16,16,0,0,1-15.41-11.72L51.11,72Z"
                    opacity="0.2"
                  ></path>
                  <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
                </svg>
              </Link>
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="wishlistCount">{cartItems.length}</span>
              )}
            </li>
            <li className="nav-item d-lg-block d-none">
              {currentUser ? (
                <div className="user-reaction-container">
                  <button className="reaction-toggle" onClick={toggleDropdown}>
                    <img
                      src="https://keenthemes.com/metronic/tailwind/react/demo1/media/avatars/300-2.png"
                      alt={currentUser.name}
                      className="img-fluid rounded-circle"
                      width="{62}"
                      height="{62}"
                    />
                  </button>
                  {isOpen && (
                    <ul className="reaction-list">
                      <li className="border-bottom">
                        <div class="d-flex align-items-center justify-content-between px-3 py-3 gap-1">
                          <div class="d-flex items-items-center gap-3 profile-img">
                            <img
                              class="size-9 rounded-full border-2 border-success"
                              src={currentUser.imgUrl}
                              alt={currentUser.name}
                              width="{62}"
                              height="{62}"
                            />
                            <div class="text-start">
                              <p className="text-sm fw-semibold mb-0">
                                {currentUser.name}
                              </p>
                              <p className="text-xs fw-medium mb-0">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="px-3 py-2 border-bottom">
                        <p className="mb-0 list-items d-flex align-items-center gap-2">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m16.1 13.359l-.528-.532zm.456-.453l.529.532zm2.417-.317l-.358.66zm1.91 1.039l-.358.659zm.539 3.255l.529.532zm-1.42 1.412l-.53-.531zm-1.326.67l.07.747zm-9.86-4.238l.528-.532zM4.002 5.746l-.749.042zm6.474 1.451l.53.532zm.157-2.654l.6-.449zM9.374 2.86l-.601.45zM6.26 2.575l.53.532zm-1.57 1.56l-.528-.531zm7.372 7.362l.529-.532zm4.567 2.394l.455-.453l-1.058-1.064l-.455.453zm1.985-.643l1.91 1.039l.716-1.318l-1.91-1.038zm2.278 3.103l-1.42 1.413l1.057 1.063l1.42-1.412zm-2.286 1.867c-1.45.136-5.201.015-9.263-4.023l-1.057 1.063c4.432 4.407 8.65 4.623 10.459 4.454zm-9.263-4.023c-3.871-3.85-4.512-7.087-4.592-8.492l-1.498.085c.1 1.768.895 5.356 5.033 9.47zm1.376-6.18l.286-.286L9.95 6.666l-.287.285zm.515-3.921L9.974 2.41l-1.201.899l1.26 1.684zM5.733 2.043l-1.57 1.56l1.058 1.064l1.57-1.56zm4.458 5.44c-.53-.532-.53-.532-.53-.53h-.002l-.003.004a1 1 0 0 0-.127.157c-.054.08-.113.185-.163.318a2.1 2.1 0 0 0-.088 1.071c.134.865.73 2.008 2.256 3.526l1.058-1.064c-1.429-1.42-1.769-2.284-1.832-2.692c-.03-.194.001-.29.01-.312q.009-.02 0-.006a.3.3 0 0 1-.03.039l-.01.01l-.01.009zm1.343 4.546c1.527 1.518 2.676 2.11 3.542 2.242c.443.068.8.014 1.071-.087a1.5 1.5 0 0 0 .42-.236l.05-.045l.007-.006l.003-.003l.001-.002s.002-.001-.527-.533c-.53-.532-.528-.533-.528-.533l.002-.002l.002-.002l.006-.005l.01-.01l.038-.03q.014-.009-.007.002c-.025.009-.123.04-.32.01c-.414-.064-1.284-.404-2.712-1.824zm-1.56-9.62C8.954 1.049 6.95.834 5.733 2.044L6.79 3.107c.532-.529 1.476-.475 1.983.202zM4.752 5.704c-.02-.346.139-.708.469-1.036L4.163 3.604c-.537.534-.96 1.29-.909 2.184zm14.72 12.06c-.274.274-.57.428-.865.455l.139 1.494c.735-.069 1.336-.44 1.784-.885zM11.006 7.73c.985-.979 1.058-2.527.229-3.635l-1.201.899c.403.539.343 1.246-.085 1.673zm9.52 6.558c.817.444.944 1.49.367 2.064l1.058 1.064c1.34-1.333.927-3.557-.71-4.446zm-3.441-.849c.384-.382 1.002-.476 1.53-.19l.716-1.317c-1.084-.59-2.428-.427-3.304.443z"
                            />
                          </svg>
                          {currentUser.phoneNumber}
                        </p>
                      </li>
                      <li className="px-3 py-2">
                        <p className="mb-0 list-items d-flex align-items-center gap-2">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.75 10a.75.75 0 0 0-1.5 0zm-14 0a.75.75 0 0 0-1.5 0zm14.72 2.53a.75.75 0 1 0 1.06-1.06zM12 3l.53-.53a.75.75 0 0 0-1.06 0zm-9.53 8.47a.75.75 0 1 0 1.06 1.06zM7 21.75h10v-1.5H7zM19.75 19v-9h-1.5v9zm-14 0v-9h-1.5v9zm15.78-7.53l-9-9l-1.06 1.06l9 9zm-10.06-9l-9 9l1.06 1.06l9-9zM17 21.75A2.75 2.75 0 0 0 19.75 19h-1.5c0 .69-.56 1.25-1.25 1.25zm-10-1.5c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 7 21.75z"
                            />
                          </svg>
                          {currentUser.address}
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button className="btn btn-primary btn-bg-red cursur-pointer">
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
