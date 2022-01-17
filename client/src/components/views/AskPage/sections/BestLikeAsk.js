import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Likes from './Likes';
import Like from '../../AskDetailPage/sections/Like';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

function BestLikeAsk() {
  const [Asks, setAsks] = useState([]);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(3);
  //eslint-disable-next-line
  const [LikeNumber, setLikeNumber] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    let body = {
      limit: Limit,
    };
    getAsks(body);
    //eslint-disable-next-line
  }, []);

  const getAsks = (body) => {
    axios.post('/api/ask/like', body).then((response) => {
      if (response.data.success) {
        setAsks(response.data.askInfo);
      } else {
        alert('인기 청원 목록을 가져오는데 실패했습니다.');
      }
    });
  };

  const updateLikeNumber = (newLikeNumber) => {
    setLikeNumber(newLikeNumber);
  };

  return (
    <div className="best-like-ask">
      <div className="ask-title">
        <div className="ask-title-header">
          <h2>인기 청원 게시글 Top 3</h2>
          <p>가장 인기있는 청원글을 응원해보세요!</p>
        </div>
        <Link to="/ask" className="ask-title-link">
          <span>전체보기</span>
          <div class="material-icons">navigate_next</div>
        </Link>
      </div>
      <div className="ask-content-wrap">
        {Asks.map((ask, index) => (
          <Link to={`/ask/${ask._id}`} className="ask-content" key={index}>
            <h3>D-{dayjs(ask.createdAt).date() + 7 - dayjs().date()}</h3>
            <h4>{ask.title}</h4>
            <div className="ask-creator">
              <h5>Creator</h5>
              <h5>{ask.creator}</h5>
            </div>
            <p>{ask.content}</p>
            <div className="like-wrap">
              <img src="/images/person_icon.png" alt="person_icon" />
              <h6>
                <Likes askId={ask._id} update={updateLikeNumber} />명 참여
              </h6>
            </div>
            <Like askId={ask._id} userId={userId} update={updateLikeNumber} />
          </Link>
        ))}
      </div>

      <div className="mob-ask-content-wrap">
        <Swiper slidesPerView={1}>
          {Asks.map((ask, index) => (
            <SwiperSlide>
              <Link to={`/ask/${ask._id}`} className="ask-content" key={index}>
                <h3>D-{dayjs(ask.createdAt).date() + 7 - dayjs().date()}</h3>
                <h4>{ask.title}</h4>
                <div className="ask-creator">
                  <h5>Creator</h5>
                  <h5>{ask.creator}</h5>
                </div>
                <p>{ask.content}</p>
                <div className="like-wrap">
                  <img src="/images/person_icon.png" alt="person_icon" />
                  <h6>
                    <Likes askId={ask._id} update={updateLikeNumber} />명 참여
                  </h6>
                </div>
                <Like
                  askId={ask._id}
                  userId={userId}
                  update={updateLikeNumber}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BestLikeAsk;
