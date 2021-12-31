import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);


const Slider = () => {
  return (
    <div className='row mb-3'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <StaticImage
            src="../../content/assets/1100x400.jpeg"
            alt=""
            layout="fullWidth"
          />
        </SwiperSlide>
        <SwiperSlide>
          <StaticImage
            src="../../content/assets/1100x400.jpeg"
            alt=""
            layout="fullWidth"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
