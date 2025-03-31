import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useFetch from "../useFetch";
const ProductSlider = () => {
  const { data, loading, error } = useFetch(
    "https://shoping-app-backend-iota.vercel.app/categories"
  );

  return (
    <div className="container py-lg-5 py-4">
      <div className="row">
        <div className="col-md-12">
          {loading && (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && <p>An error occured while fetching users.</p>}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              992: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            {data?.categories &&
              data.categories.length > 0 &&
              data?.categories?.map((category, index) => (
                <SwiperSlide key={index}>
                  <a href={`/products/categories/${category}`}>
                    <div className="card-Content card border-0 position-relative overflow-hidden">
                      <div className="card-img">
                        {category === "men" && (
                          <img
                            src="https://image.hm.com/assets/hm/65/b7/65b7b874dcbc4e100fb0952c15938f5e258af495.jpg?imwidth=564"
                            alt="Mens Category"
                            className="img-fluid"
                          />
                        )}
                        {category === "women" && (
                          <img
                            src="https://image.hm.com/assets/hm/60/30/6030f9ab7ef52928f714a7f0ded8f99591e40ff2.jpg?imwidth=564"
                            alt="Women Category"
                            className="img-fluid"
                          />
                        )}
                        {category === "kids" && (
                          <img
                            src="https://image.hm.com/assets/hm/41/04/4104d8adc785db7b214f9b058f83b5db35c09378.jpg?imwidth=564"
                            alt="Kids Category"
                            className="img-fluid"
                          />
                        )}
                        {category === "sport" && (
                          <img
                            src="https://image.hm.com/assets/hm/d3/ec/d3ecd69762aa3c5426632caa07895f0d2ea77e2b.jpg?imwidth=564"
                            alt="Home & Living Category"
                            className="img-fluid"
                          />
                        )}
                        {category === "home" && (
                          <img
                            src="https://image.hm.com/assets/hm/c8/0b/c80b8bd7b7eebb693185bc8f5828d15e3e0d97ff.jpg?imwidth=564"
                            alt="Electronics Category"
                            className="img-fluid"
                          />
                        )}
                      </div>
                      <div className="card-Content-Text">
                        <h2>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h2>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
