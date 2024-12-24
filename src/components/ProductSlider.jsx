import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductSlider = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            navigation={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <a href="/products">
                <div className="card-Content card border-0">
                  <img
                    src="https://image.hm.com/assets/hm/65/b7/65b7b874dcbc4e100fb0952c15938f5e258af495.jpg?imwidth=564"
                    alt="logo"
                    className="img-fluid"
                  />
                  <div className="card-Content-Text">
                    <h2>Mens</h2>
                  </div>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products">
                <div className="card-Content card border-0">
                  <img
                    src="https://image.hm.com/assets/hm/60/30/6030f9ab7ef52928f714a7f0ded8f99591e40ff2.jpg?imwidth=564"
                    alt="logo"
                    className="img-fluid"
                  />
                  <div className="card-Content-Text">
                    <h2>Women</h2>
                  </div>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products">
                <div className="card-Content card border-0">
                  <img
                    src="https://image.hm.com/assets/hm/41/04/4104d8adc785db7b214f9b058f83b5db35c09378.jpg?imwidth=564"
                    alt="logo"
                    className="img-fluid"
                  />
                  <div className="card-Content-Text">
                    <h2>Kids</h2>
                  </div>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products">
                <div className="card-Content card">
                  <img
                    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-holiday-iphone-pro-202411_GEO_IN?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1730393052722"
                    alt="logo"
                    className="img-fluid"
                  />
                  <div className="card-Content-Text">
                    <h2>Home & Living</h2>
                  </div>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products">
                <div className="card-Content card">
                  <img
                    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-holiday-macbook-pro-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728492746398"
                    alt="logo"
                    className="img-fluid"
                  />
                  <div className="card-Content-Text">
                    <h2>Electronics</h2>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};


export default ProductSlider;