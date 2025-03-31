import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import store from "./app/store";
import { Provider } from "react-redux";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/Cart";
import AddressCart from "./pages/Address";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/categories/:category",
    element: <ProductsList />,
  },
  {
    path: "/products/:category/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/address",
    element: <AddressCart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

