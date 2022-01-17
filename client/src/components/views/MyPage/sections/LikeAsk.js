import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Likes from '../../AskPage/sections/Likes';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

function LikeAsk(props) {
  const [Asks, setAsks] = useState([]);
  //eslint-disable-next-line
  const [LikeNumber, setLikeNumber] = useState(0);
  let body = { userId: props.userId };

  useEffect(() => {
    axios.post('/api/mypage/like', body).then((response) => {
      if (response.data.success) {
        setAsks(response.data.likeAsks);
      } else {
        alert('응원 데이터를 가져오는데 실패했습니다.');
      }
    });
    //eslint-disable-next-line
  }, []);

  const updateLikeNumber = (newLikeNumber) => {
    setLikeNumber(newLikeNumber);
  };

  return (
    <React.Fragment>
      <div className="content-wrap">
        <h1>응원</h1>
        <hr />
        <h2>응원한 청원</h2>
        {Asks.map((likeAsk, index) => (
          <Link
            to={`/ask/${likeAsk.askId._id}`}
            className="like-mode"
            key={index}
          >
            <div className="content-info">
              <h3>
                D-{dayjs(likeAsk.askId.createdAt).date() + 7 - dayjs().date()}
              </h3>
              <h4>{likeAsk.askId.title}</h4>
              <div className="btm-info">
                <div className="creator">
                  <h5>Creator</h5>
                  <h5>{likeAsk.askId.creator}</h5>
                </div>
                <div className="like-wrap">
                  <img src="/images/person_icon.png" alt="person_icon" />
                  <h6>
                    <Likes
                      askId={likeAsk.askId._id}
                      update={updateLikeNumber}
                    />
                    명 참여
                  </h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mob-content-wrap">
        <h1>응원한 청원</h1>
        <Swiper slidesPerView={1}>
          {Asks.map((likeAsk, index) => (
            <SwiperSlide>
              <Link
                to={`/ask/${likeAsk.askId._id}`}
                className="like-mode"
                key={index}
              >
                <div className="content-info">
                  <h3>
                    D-
                    {dayjs(likeAsk.askId.createdAt).date() + 7 - dayjs().date()}
                  </h3>
                  <h4>{likeAsk.askId.title}</h4>
                  <div className="btm-info">
                    <div className="creator">
                      <h5>Creator</h5>
                      <h5>{likeAsk.askId.creator}</h5>
                    </div>
                    <div className="like-wrap">
                      <img src="/images/person_icon.png" alt="person_icon" />
                      <h6>
                        <Likes
                          askId={likeAsk.askId._id}
                          update={updateLikeNumber}
                        />
                        명 참여
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
}

export default LikeAsk;
