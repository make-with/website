import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/swiper.min.css';
import {Link} from 'react-router-dom'; 

function Notice() {
  SwiperCore.use([Autoplay]);

  return(
    <section className="notice">
      <div className="notice-box">
        <img src="/images/notice_icon.png" alt="notice_icon" />
        <h2>[공지사항]</h2>
        <Swiper slidesPerView={1} autoplay={{delay: 5000}}>
          <SwiperSlide><Link to="/notice">신규가입 회원 혜택 안내</Link></SwiperSlide>
          <SwiperSlide><Link to="/notice">1만원 충전시 10% 추가 적립</Link></SwiperSlide>
          <SwiperSlide><Link to="/notice">추천인 등록하면 5000p 증정</Link></SwiperSlide>
          <SwiperSlide><Link to="/notice">SNS 공유 이벤트 진행중</Link></SwiperSlide>
        </Swiper>
        <Link to="/notice">
          <div className="material-icons">
            navigate_next
          </div>
        </Link>
      </div>         
    </section>
  )
}

export default Notice;