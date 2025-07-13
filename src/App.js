import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "swiper/css";
import "swiper/css/pagination";
import ProductSlider from "./components/ProductSlider";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductSlider />
      <div className="container-fluid py-lg-5 py-3">
        <div className="row">
          <div className="col-md-12">
            <div className="offer-banner">
              <img
                src="https://levi.in/cdn/shop/files/Desktop_1_b9d6344b-3d31-4d4d-a472-beacd6b9fff5.jpg?v=1734948744"
                alt="logo"
                className="w-100 img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-lg-5 py-4">
        <div className="row gy-lg-0 gy-4">
          <div className="col-md-4">
            <div className="position-relative">
              <div className="rounded-4">
                <img
                  src="https://res.cloudinary.com/doctl427o/image/upload/v1735487367/regular-fit-overshirt_l4a87x.avif"
                  alt="logo"
                  className="w-100 img-fluid rounded-4"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Mens</h2>
                <a
                  href="/products/categories/men"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative">
              <div className="rounded-4">
                <img
                  src="https://res.cloudinary.com/doctl427o/image/upload/v1735489967/wide-high-jeans_cjr1mc.avif"
                  alt="logo"
                  className="w-100 img-fluid rounded-4"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Womens</h2>
                <a
                 href="/products/categories/women"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative">
              <div className="rounded-4">
                <img
                  src="https://res.cloudinary.com/doctl427o/image/upload/v1735927329/kids-4_gueyx4.jpg"
                  alt="logo"
                  className="w-100 img-fluid rounded-4"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Kids</h2>
                <a
                  href="/products/categories/kids"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
