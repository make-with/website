import React from 'react';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import {Link} from 'react-router-dom';
// import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css';

function PayFunding(props) {
  // const [Asks, setAsks] = useState([]);
  // let body = {userId: props.userId};

  // useEffect(() => {
  //   axios.post('/api/mypage/like', body)
  //   .then(response => {
  //     if(response.data.success) {
  //       setAsks(response.data.likeAsks)
  //     } else {
  //       alert('응원 데이터를 가져오는데 실패했습니다.')
  //     }
  //   })
  // //eslint-disable-next-line
  // }, []);

  return (
    <React.Fragment>
      <div className="content-wrap">
        <h1>결제</h1>
        <hr />
        <h2>결제한 펀딩</h2>
        <div className="notice-mode">
          <img src="/images/notice_icon.png" alt="notice_icon" />
          <p>아직 결제한 펀딩이 없어요.</p>
        </div>
        {/* {Asks.map((likeAsk, index) => (
          <Link to={`/ask/${likeAsk.askId._id}`} className="like-mode" key={index}>            
            <div className="content-info">
              <h3>D-{
                dayjs(likeAsk.askId.createdAt).date()+30-dayjs().date()
              }</h3>
              <h4>{likeAsk.askId.title}</h4>
              <div className="btm-info">
                <div className="creator">
                  <h5>Creator</h5>
                  <h5>{likeAsk.askId.creator}</h5>
                </div>
              </div>
              <hr />
              <div className="pay-wrap">
                <span>후원금액</span>
                <span>18,000원</span>
              </div>
            </div>
          </Link>
          ))
        } */}
      </div>

      {/* <div className="mob-content-wrap">
        <h1 className="pay">결제한 펀딩</h1>
        <Swiper slidesPerView={1}> 
          {Asks.map((likeAsk, index) => (
            <SwiperSlide>
              <Link to={`/ask/${likeAsk.askId._id}`} className="pay-mode" key={index}>            
                <div className="content-info">
                  <h3>D-{
                    dayjs(likeAsk.askId.createdAt).date()+30-dayjs().date()
                  }</h3>
                  <h4>{likeAsk.askId.title}</h4>
                  <div className="btm-info">
                    <div className="creator">
                      <h5>Creator</h5>
                      <h5>{likeAsk.askId.creator}</h5>
                    </div>
                  </div>
                  <hr />
                  <div className="pay-wrap">
                    <span>후원금액</span>
                    <span>18,000원</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            ))
          }
        </Swiper>
      </div> */}
    </React.Fragment>
  );
}

export default PayFunding;
