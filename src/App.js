import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductSlider from "./components/ProductSlider";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <AddressCart/> */}
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
              <div className="">
                <img
                  src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fe7%2F9c%2Fe79c3a401e23c744f1df72e9f021821648e873ab.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"
                  alt="logo"
                  className="w-100 img-fluid"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Mens</h2>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative">
              <div className="">
                <img
                  src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F13%2Ffd%2F13fdf70d974215c7a600b5c38738b10b3f07c20c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
                  alt="logo"
                  className="w-100 img-fluid"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Womens</h2>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative">
              <div className="">
                <img
                  src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F47%2F3b%2F473b950f11f1aa374fbaf7d11e500d095a3310eb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
                  alt="logo"
                  className="w-100 img-fluid"
                />
              </div>
              <div className="position-absolute bottom-0 start-0 end-0 z-index-1 p-5 text-start">
                <p className="text-white mb-0">Your Exclusive Access</p>
                <h2 className="text-white mb-4">New arrivals Mens</h2>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill px-3 btn-bg-red"
                >
                  Shop
                </button>
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
