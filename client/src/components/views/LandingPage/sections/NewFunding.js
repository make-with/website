import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'; 
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css';
import {API_URL} from '../../../../url/url';

function NewFunding() {
  const [Fundings, setFundings] = useState([]);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(3);

  useEffect(() => {
    let body = {
      limit: Limit
    }
    getFundings(body)
  //eslint-disable-next-line
  }, []);

  const getFundings = (body) => {
    axios.post('/api/funding/new', body)
    .then(response => {
      if(response.data.success) {
        setFundings(response.data.fundingInfo)
      } else {
        alert('최신 펀딩 목록을 가져오는데 실패했습니다.')
      };
    });
  };

  return (
    <div className="new-funding">
      <div className="funding-title-wrap">
        <div className="funding-title-header">
          <h2>최신 콘텐츠 펀딩</h2>
          <p>최신 콘텐츠 펀딩에 참여해보세요!</p>
        </div>
        <Link to="/funding" className="funding-title-link">
          <span>전체보기</span>
          <div class="material-icons">
            navigate_next
          </div>
        </Link>
      </div>
      <div className="funding-content-wrap">
        {Fundings.map((funding, index) => (
          <Link to={`/funding/${funding._id}`} className="funding-content" key={index}>
            <img src={`${API_URL}/${funding.image}`} alt="funding_image" />
            <div className="funding-info">
              <div className="funding-title">
                <h3>D-{
                    dayjs(funding.createdAt).date()+30-dayjs().date() 
                    }</h3>
                <h4>{funding.title}</h4>
              </div>
              <div className="funding-creator">
                <h5>Creator</h5>
                <h5>{funding.creator}</h5>
              </div>
              <p>{funding.content}</p>
            </div>
          </Link>
          ))
        }
      </div>

      <div className="mob-funding-content-wrap">
        <Swiper slidesPerView={1}> 
          {Fundings.map((funding, index) => (
            <SwiperSlide>
              <Link to={`/funding/${funding._id}`} className="funding-content" key={index}>
                <img src={`${API_URL}/${funding.image}`} alt="funding_image" />
                <div className="funding-info">
                  <div className="funding-title">
                    <h3>D-{
                        dayjs(funding.createdAt).date()+30-dayjs().date() 
                        }</h3>
                    <h4>{funding.title}</h4>
                  </div>
                  <div className="funding-creator">
                    <h5>Creator</h5>
                    <h5>{funding.creator}</h5>
                  </div>
                  <p>{funding.content}</p>
                </div>
              </Link>
            </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default NewFunding;
