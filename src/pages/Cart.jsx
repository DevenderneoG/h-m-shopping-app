// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchCart,
// //   addToCart,
// //   removeFromCart,
// //   updateCartItem,
// // } from "./cartSlice";
// // import { fetchWishlist, addWishList } from "./wishlistSlice";
// // import { useEffect } from "react";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";

// // const CartComponent = () => {
// //   const dispatch = useDispatch();
// //   const {
// //     items,
// //     _id: cartId,
// //     status,
// //     error,
// //   } = useSelector((state) => state.cart);

// //   const {
// //     items: wishlistItems,
// //     status: wishlistStatus,
// //     error: wishlistError,
// //   } = useSelector((state) => state.wishlist);

// //   useEffect(() => {
// //     dispatch(fetchCart());
// //     dispatch(fetchWishlist());
// //   }, [dispatch]);

// //   const handleAddToCart = () => {
// //     dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
// //   };

// //   const handleRemoveFromCart = (productId) => {
// //     dispatch(removeFromCart({ cartId, productId }));
// //   };

// //   const handleUpdateQuantity = (productId, newQuantity) => {
// //     dispatch(updateCartItem({ cartId, productId, quantity: newQuantity }));
// //   };

// //   const handleAddToWishlist = (productId) => {
// //     dispatch(addWishList({ productId }));
// //   };

// //   // Define the discount percentage (can be dynamic if needed)
// //   const discount = 50;

// //   // Calculate discount price for an item
// //   const calculateDiscountedPrice = (price) => {
// //     return price - (price * discount) / 100;
// //   };

// //   // Calculate total prices (original and discounted)
// //   const calculateTotal = () => {
// //     const totalOriginal = items.reduce(
// //       (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
// //       0
// //     );
// //     const totalDiscounted = items.reduce(
// //       (sum, item) =>
// //         sum +
// //         calculateDiscountedPrice(item.productId?.price || 0) * item.quantity,
// //       0
// //     );
// //     return { totalOriginal, totalDiscounted };
// //   };

// //   const { totalOriginal, totalDiscounted } = calculateTotal();

// //   const isProductInWishlist = (productId) => {
// //     return (
// //       Array.isArray(wishlistItems) &&
// //       wishlistItems.some((item) => item.productId._id === productId)
// //     );
// //   };

// //   return (
// //     <div className="cart-page">
// //       <Header />
// //       {status === "loading" && <p>Loading...</p>}
// //       {error && <p className="text-danger">Error: {error}</p>}
// //       {wishlistError && <p className="text-danger">Wishlist Error: {wishlistError}</p>}
// //       {status === "succeeded" && items.length === 0 && (
// //         <p>Your cart is empty</p>
// //       )}
// //       <div className="container">
// //         <div className="row">
// //           <div className="col-lg-8">
// //             <div className="card p-4">
// //               <ul className="list-unstyled mb-0 product-list">
// //                 {items.map((item) => {
// //                   if (!item.productId || !item.productId.price) {
// //                     return (
// //                       <li key={item._id}>
// //                         <p>Product data unavailable</p>
// //                       </li>
// //                     );
// //                   }

// //                   const discountedPrice = calculateDiscountedPrice(
// //                     item.productId.price
// //                   );

// //                   return (
// //                     <li key={item._id}>
// //                       <div className="d-flex product-card gap-4 mb-4">
// //                         <div className="product-card-img">
// //                           <img
// //                             src={item.productId.productImageURL}
// //                             alt={item.productId.title}
// //                           />
// //                         </div>
// //                         <div className="d-flex align-items-start justify-content-between flex-grow-1">
// //                           <div>
// //                             <h3>{item.productId.title}</h3>
// //                             <p>
// //                               <span className="fs-4 fw-bolder">
// //                                 ₹{discountedPrice.toFixed(2)}
// //                               </span>{" "}
// //                               <span className="fs-4 text-black-50 ms-3">
// //                                 <del>₹{item.productId.price}</del>
// //                               </span>
// //                             </p>
// //                             <p>Quantity: {item.quantity}</p>
// //                             <button
// //                               className="btn btn-primary btn-bg-red cursor-pointer"
// //                               onClick={() => handleAddToWishlist(item.productId._id)}
// //                               disabled={wishlistStatus === "loading"}
// //                             >
// //                               {isProductInWishlist(item.productId._id)
// //                                 ? "In Wishlist"
// //                                 : wishlistStatus === "loading"
// //                                 ? "Adding..."
// //                                 : "Add to Wishlist"}
// //                             </button>
// //                           </div>
// //                           <div
// //                             className=""
// //                             onClick={() =>
// //                               handleRemoveFromCart(item.productId._id)
// //                             }
// //                           >
// //                             <svg
// //                               xmlns="http://www.w3.org/2000/svg"
// //                               width="24"
// //                               height="24"
// //                               viewBox="0 0 24 24"
// //                             >
// //                               <g fill="none">
// //                                 <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
// //                                 <path
// //                                   fill="currentColor"
// //                                   d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
// //                                 />
// //                               </g>
// //                             </svg>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </li>
// //                   );
// //                 })}
// //               </ul>
// //             </div>
// //           </div>
// //           {items.length > 0 && (
// //             <div className="col-lg-4">
// //               <div className="card">
// //                 <div className="card-body">
// //                   <h5>Cart Summary</h5>
// //                   <p>Original Total: ₹{totalOriginal.toFixed(2)}</p>
// //                   <p>Discounted Total: ₹{totalDiscounted.toFixed(2)}</p>
// //                   <p>
// //                     Savings: ₹{(totalOriginal - totalDiscounted).toFixed(2)}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CartComponent;

// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCart,
//   addToCart,
//   removeFromCart,
//   updateCartItem,
// } from "./cartSlice";
// import { fetchWishlist, addWishList } from "./wishlistSlice";
// import { useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const CartComponent = () => {
//   const dispatch = useDispatch();
//   const {
//     items,
//     _id: cartId,
//     status,
//     error,
//   } = useSelector(
//     (state) =>
//       state.cart || { items: [], _id: null, status: "idle", error: null }
//   );

//   const {
//     items: wishlistItems,
//     status: wishlistStatus,
//     error: wishlistError,
//   } = useSelector(
//     (state) => state.wishlist || { items: [], status: "idle", error: null }
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleAddToCart = () => {
//     dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
//   };

//   const handleRemoveFromCart = (productId) => {
//     if (!cartId) {
//       console.error("Cart ID is not available");
//       return;
//     }
//     dispatch(removeFromCart({ cartId, productId }));
//   };

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     if (!cartId) {
//       console.error("Cart ID is not available");
//       return;
//     }
//     dispatch(updateCartItem({ cartId, productId, quantity: newQuantity }));
//   };

//   const handleAddToWishlist = (productId) => {
//     dispatch(addWishList({ productId }));
//   };

//   // Define the discount percentage (can be dynamic if needed)
//   const discount = 50;

//   // Calculate discount price for an item
//   const calculateDiscountedPrice = (price) => {
//     return price - (price * discount) / 100;
//   };

//   // Calculate total prices (original and discounted)
//   const calculateTotal = () => {
//     const totalOriginal = items.reduce(
//       (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//       0
//     );
//     const totalDiscounted = items.reduce(
//       (sum, item) =>
//         sum +
//         calculateDiscountedPrice(item.productId?.price || 0) * item.quantity,
//       0
//     );
//     return { totalOriginal, totalDiscounted };
//   };

//   const { totalOriginal, totalDiscounted } = calculateTotal();

//   const isProductInWishlist = (productId) => {
//     return (
//       Array.isArray(wishlistItems) &&
//       wishlistItems.some((item) => item.productId?._id === productId)
//     );
//   };

//   return (
//     <div className="cart-page">
//       <Header />
//       {status === "loading" && <p>Loading...</p>}
//       {error && <p className="text-danger">Error: {error}</p>}
//       {wishlistError && (
//         <p className="text-danger">Wishlist Error: {wishlistError}</p>
//       )}
//       {status === "succeeded" && items.length === 0 && (
//         <p>Your cart is empty</p>
//       )}
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-8">
//             <div className="card p-4">
//               <ul className="list-unstyled mb-0 product-list">
//                 {items.map((item) => {
//                   if (!item.productId || !item.productId.price) {
//                     return (
//                       <li key={item._id}>
//                         <p>Product data unavailable</p>
//                       </li>
//                     );
//                   }

//                   const discountedPrice = calculateDiscountedPrice(
//                     item.productId.price
//                   );

//                   return (
//                     <li key={item._id}>
//                       <div className="d-flex product-card gap-4 mb-4">
//                         <div className="product-card-img">
//                           <img
//                             src={item.productId.productImageURL}
//                             alt={item.productId.title}
//                           />
//                         </div>
//                         <div className="d-flex align-items-start justify-content-between flex-grow-1">
//                           <div>
//                             <h3>{item.productId.title}</h3>
//                             <p>
//                               <span className="fs-4 fw-bolder">
//                                 ₹{discountedPrice.toFixed(2)}
//                               </span>{" "}
//                               <span className="fs-4 text-black-50 ms-3">
//                                 <del>₹{item.productId.price}</del>
//                               </span>
//                             </p>
//                             <div className="d-flex align-items-center gap-2 mb-4">
//                               <button type="button" className="btn btn-outline-dark decreaseNumber">-</button>
//                               <div>{item.quantity}</div>
//                               <button type="button" className="btn btn-outline-dark increaseNumber">+</button>
//                             </div>
//                             <button
//                               className="btn btn-primary btn-bg-red cursor-pointer"
//                               onClick={() =>
//                                 handleAddToWishlist(item.productId._id)
//                               }
//                               disabled={wishlistStatus === "loading"}
//                             >
//                               {isProductInWishlist(item.productId._id)
//                                 ? "In Wishlist"
//                                 : wishlistStatus === "loading"
//                                 ? "Adding..."
//                                 : "Add to Wishlist"}
//                             </button>
//                           </div>
//                           <div
//                             className="deletebtn"
//                             onClick={() =>
//                               handleRemoveFromCart(item.productId._id)
//                             }
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                             >
//                               <g fill="none">
//                                 <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
//                                 <path
//                                   fill="currentColor"
//                                   d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
//                                 />
//                               </g>
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//           {items.length > 0 && (
//             <div className="col-lg-4">
//               <div className="card">
//                 <div className="card-body">
//                   <h5>Cart Summary</h5>
//                   <hr />
//                   {items.map((item) => {
//                     <p>Original Total: ₹{item.productId?.price.toFixed(2)}</p>;
//                   })}
//                   <p>Original Total: ₹{totalOriginal.toFixed(2)}</p>
//                   <p>Discounted Total: ₹{totalDiscounted.toFixed(2)}</p>
//                   <p>
//                     Savings: ₹{(totalOriginal - totalDiscounted).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CartComponent;

// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCart,
//   addToCart,
//   removeFromCart,
//   updateCartItem,
// } from "./cartSlice";
// import { fetchWishlist, addWishList } from "./wishlistSlice";
// import { useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const CartComponent = () => {
//   const dispatch = useDispatch();
//   const {
//     items,
//     _id: cartId,
//     status,
//     error,
//   } = useSelector(
//     (state) =>
//       state.cart || { items: [], _id: null, status: "idle", error: null }
//   );

//   const {
//     items: wishlistItems,
//     status: wishlistStatus,
//     error: wishlistError,
//   } = useSelector(
//     (state) => state.wishlist || { items: [], status: "idle", error: null }
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleAddToCart = () => {
//     dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
//   };

//   const handleRemoveFromCart = (productId) => {
//     if (!cartId) {
//       console.error("Cart ID is not available");
//       return;
//     }
//     dispatch(removeFromCart({ cartId, productId }));
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     if (!cartId) {
//       console.error("Cart ID is not available");
//       return;
//     }
//     const updatedQuantity = Math.max(1, newQuantity);
//     dispatch(updateCartItem({ cartId, productId, quantity: updatedQuantity }));
//   };

//   const handleAddToWishlist = (productId) => {
//     dispatch(addWishList({ productId }));
//   };

//   const discount = 50;

//   const calculateDiscountedPrice = (price) => {
//     return price - (price * discount) / 100;
//   };

//   const calculateItemTotal = (price, quantity) => {
//     return {
//       original: price * quantity,
//       discounted: calculateDiscountedPrice(price) * quantity
//     };
//   };

//   const calculateTotal = () => {
//     const totalOriginal = items.reduce(
//       (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//       0
//     );
//     const totalDiscounted = items.reduce(
//       (sum, item) =>
//         sum +
//         calculateDiscountedPrice(item.productId?.price || 0) * item.quantity,
//       0
//     );
//     return { totalOriginal, totalDiscounted };
//   };

//   const { totalOriginal, totalDiscounted } = calculateTotal();

//   const isProductInWishlist = (productId) => {
//     return (
//       Array.isArray(wishlistItems) &&
//       wishlistItems.some((item) => item.productId?._id === productId)
//     );
//   };

//   return (
//     <div className="cart-page">
//       <Header />
//       {status === "loading" && <p>Loading...</p>}
//       {error && <p className="text-danger">Error: {error}</p>}
//       {wishlistError && (
//         <p className="text-danger">Wishlist Error: {wishlistError}</p>
//       )}
//       {status === "succeeded" && items.length === 0 && (
//         <p>Your cart is empty</p>
//       )}
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-8">
//             <div className="card p-4">
//               <ul className="list-unstyled mb-0 product-list">
//                 {items.map((item) => {
//                   if (!item.productId || !item.productId.price) {
//                     return (
//                       <li key={item._id}>
//                         <p>Product data unavailable</p>
//                       </li>
//                     );
//                   }

//                   const discountedPrice = calculateDiscountedPrice(item.productId.price);
//                   const itemTotal = calculateItemTotal(item.productId.price, item.quantity);

//                   return (
//                     <li key={item._id}>
//                       <div className="d-flex product-card gap-4 mb-4">
//                         <div className="product-card-img">
//                           <img
//                             src={item.productId.productImageURL}
//                             alt={item.productId.title}
//                           />
//                         </div>
//                         <div className="d-flex align-items-start justify-content-between flex-grow-1">
//                           <div>
//                             <h3>{item.productId.title}</h3>
//                             <p>
//                               <span className="fs-4 fw-bolder">
//                                 ₹{discountedPrice.toFixed(2)}
//                               </span>{" "}
//                               <span className="fs-4 text-black-50 ms-3">
//                                 <del>₹{item.productId.price}</del>
//                               </span>
//                             </p>
//                             <div className="d-flex align-items-center gap-2 mb-2">
//                               <button
//                                 type="button"
//                                 className="btn btn-outline-dark decreaseNumber"
//                                 onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
//                               >
//                                 -
//                               </button>
//                               <div>{item.quantity}</div>
//                               <button
//                                 type="button"
//                                 className="btn btn-outline-dark increaseNumber"
//                                 onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <p>
//                               Item Total:
//                               <span className="fw-bold ms-2">
//                                 ₹{itemTotal.discounted.toFixed(2)}
//                               </span>
//                               <span className="text-black-50 ms-2">
//                                 <del>₹{itemTotal.original.toFixed(2)}</del>
//                               </span>
//                             </p>
//                             <button
//                               className="btn btn-primary btn-bg-red cursor-pointer"
//                               onClick={() => handleAddToWishlist(item.productId._id)}
//                               disabled={wishlistStatus === "loading"}
//                             >
//                               {isProductInWishlist(item.productId._id)
//                                 ? "In Wishlist"
//                                 : wishlistStatus === "loading"
//                                 ? "Adding..."
//                                 : "Add to Wishlist"}
//                             </button>
//                           </div>
//                           <div
//                             className="deletebtn"
//                             onClick={() => handleRemoveFromCart(item.productId._id)}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                             >
//                               <g fill="none">
//                                 <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.10-.01z" />
//                                 <path
//                                   fill="currentColor"
//                                   d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
//                                 />
//                               </g>
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//           {items.length > 0 && (
//             <div className="col-lg-4">
//               <div className="card">
//                 <div className="card-body">
//                   <h5>Cart Summary</h5>
//                   <hr />
//                   <p>Original Total: ₹{totalOriginal.toFixed(2)}</p>
//                   <p>Discounted Total: ₹{totalDiscounted.toFixed(2)}</p>
//                   <p>
//                     Savings: ₹{(totalOriginal - totalDiscounted).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CartComponent;

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "./cartSlice";
import { fetchWishlist, addWishList } from "./wishlistSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartComponent = () => {
  const dispatch = useDispatch();
  const {
    items,
    _id: cartId,
    status,
    error,
  } = useSelector(
    (state) =>
      state.cart || { items: [], _id: null, status: "idle", error: null }
  );

  const {
    items: wishlistItems,
    status: wishlistStatus,
    error: wishlistError,
  } = useSelector(
    (state) => state.wishlist || { items: [], status: "idle", error: null }
  );

  // Local state to track updating items
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: "67717253dbfea60f55f6e999", quantity: 1 }));
  };

  const handleRemoveFromCart = (productId) => {
    if (!cartId) return;
    dispatch(removeFromCart({ cartId, productId }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (!cartId) {
      console.error("Cart ID is not available");
      return;
    }
    const updatedQuantity = Math.max(1, newQuantity);
    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));

    dispatch(updateCartItem({ cartId, productId, quantity: updatedQuantity }))
      .unwrap()
      .then(() => toast.success("Quantity updated successfully"))
      .catch((err) => {
        toast.error(err);
        if (err === "Cart not found" || err === "Product not found in cart") {
          dispatch(fetchCart()); // Refresh cart if not found
        }
      })
      .finally(() => {
        setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
      });
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addWishList({ productId }));
  };

  const discount = 50;

  const calculateDiscountedPrice = (price) => {
    return price - (price * discount) / 100;
  };

  const calculateItemTotal = (price, quantity) => {
    return {
      original: price * quantity,
      discounted: calculateDiscountedPrice(price) * quantity,
    };
  };

  const calculateTotal = () => {
    const totalOriginal = items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
    const totalDiscounted = items.reduce(
      (sum, item) =>
        sum +
        calculateDiscountedPrice(item.productId?.price || 0) * item.quantity,
      0
    );
    return { totalOriginal, totalDiscounted };
  };

  const { totalOriginal, totalDiscounted } = calculateTotal();

  const isProductInWishlist = (productId) => {
    return (
      Array.isArray(wishlistItems) &&
      wishlistItems.some((item) => item.productId?._id === productId)
    );
  };

  return (
    <div className="cart-page">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      {status === "loading" && <p>Loading cart...</p>}
      {status === "failed" && (
        <p className="text-danger">
          Cart Error: {error || "Unable to load cart"}
        </p>
      )}
      {wishlistStatus === "failed" && (
        <p className="text-danger">
          Wishlist Error: {wishlistError || "Unable to load wishlist"}
        </p>
      )}
      {status === "succeeded" && items.length === 0 && (
        <p>Your cart is empty</p>
      )}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4">
              <ul className="list-unstyled mb-0 product-list">
                {items.map((item) => {
                  if (!item.productId || !item.productId.price) {
                    return (
                      <li key={item._id}>
                        <p>Product data unavailable</p>
                      </li>
                    );
                  }

                  const discountedPrice = calculateDiscountedPrice(
                    item.productId.price
                  );
                  const itemTotal = calculateItemTotal(
                    item.productId.price,
                    item.quantity
                  );
                  const isUpdating = updatingItems[item.productId._id];

                  return (
                    <li key={item._id}>
                      <div className="d-flex product-card gap-4 mb-4">
                        <div className="product-card-img">
                          <img
                            src={item.productId.productImageURL}
                            alt={item.productId.title}
                            onError={(e) =>
                              (e.target.src = "/placeholder-image.jpg")
                            }
                          />
                        </div>
                        <div className="d-flex align-items-start justify-content-between flex-grow-1 cart-content">
                          <div>
                            <h3>{item.productId.title}</h3>
                            <p>
                              <span className="fs-4 fw-bolder">
                                ₹{discountedPrice.toFixed(2)}
                              </span>{" "}
                              <span className="fs-4 text-black-50 ms-3">
                                <del>₹{item.productId.price}</del>
                              </span>
                            </p>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <button
                                type="button"
                                className="btn btn-outline-dark decreaseNumber"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId._id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={isUpdating || item.quantity <= 1}
                              >
                                -
                              </button>
                              <div>
                                {isUpdating ? "Updating..." : item.quantity}
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-dark increaseNumber"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId._id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={isUpdating}
                              >
                                +
                              </button>
                            </div>
                            <p>
                              Item Total:
                              <span className="fw-bold ms-2">
                                ₹{itemTotal.discounted.toFixed(2)}
                              </span>
                              <span className="text-black-50 ms-2">
                                <del>₹{itemTotal.original.toFixed(2)}</del>
                              </span>
                            </p>
                            <button
                              className="btn btn-primary btn-bg-red cursor-pointer"
                              onClick={() =>
                                handleAddToWishlist(item.productId._id)
                              }
                              disabled={wishlistStatus === "loading"}
                            >
                              {isProductInWishlist(item.productId._id)
                                ? "In Wishlist"
                                : wishlistStatus === "loading"
                                ? "Adding..."
                                : "Add to Wishlist"}
                            </button>
                          </div>
                          <div
                            className="deletebtn"
                            onClick={() =>
                              handleRemoveFromCart(item.productId._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none">
                                <path
                                  fill="currentColor"
                                  d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {items.length > 0 && (
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5>Cart Summary</h5>
                  <hr />
                  <p>Original Total: ₹{totalOriginal.toFixed(2)}</p>
                  <p>Discounted Total: ₹{totalDiscounted.toFixed(2)}</p>
                  <p>
                    Savings: ₹{(totalOriginal - totalDiscounted).toFixed(2)}
                  </p>
                  <a
                  href="./address"
                    className="btn btn-primary btn-bg-red cursor-pointer"                   
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartComponent;
