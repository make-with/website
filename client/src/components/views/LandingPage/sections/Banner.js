import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Autoplay} from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

function Banner() {
  SwiperCore.use([Pagination, Autoplay]);

  return(
    <React.Fragment>
      <section className="banner">
        <Swiper slidesPerView={1} pagination={{clickable: true}} autoplay={{delay: 3000}}>
          <SwiperSlide><img src="/images/banner1.png" alt="banner1" /></SwiperSlide>
          <SwiperSlide><img src="/images/banner2.png" alt="banner2" /></SwiperSlide>
          <SwiperSlide><img src="/images/banner3.png" alt="banner3" /></SwiperSlide>
        </Swiper>
      </section>

      <section className="mob-banner">
        <Swiper slidesPerView={1} pagination={{clickable: true}} autoplay={{delay: 3000}}>
          <SwiperSlide><img src="/images/mob_banner1.png" className="mob-banner" alt="mob_banner1" /></SwiperSlide>
          <SwiperSlide><img src="/images/mob_banner2.png" className="mob-banner" alt="mob_banner2" /></SwiperSlide>
          <SwiperSlide><img src="/images/mob_banner3.png" className="mob-banner" alt="mob_banner3" /></SwiperSlide>
        </Swiper>
      </section>
    </React.Fragment>
  )
}

export default Banner;