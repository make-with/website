import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'; 
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css';
import {API_URL} from '../../../../url/url';
        
function NewContent() {
  const [Contents, setContents] = useState([]);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(3);

  useEffect(() => {
    let body = {
      limit: Limit
    }
    getContents(body)
  //eslint-disable-next-line
  }, []);

  const getContents = (body) => {
    axios.post('/api/content/new', body)
    .then(response => {
      if(response.data.success) {
        setContents(response.data.contentInfo)
      } else {
        alert('최신 콘텐츠 목록을 가져오는데 실패했습니다.')
      };
    });
  };

  return (
    <div className="new-content">
      <div className="content-title-wrap">
        <div className="content-title-header">
          <h2>최신 콘텐츠</h2>
          <p>최신 콘텐츠를 구경해보세요!</p>
        </div>
        <Link to="/content" className="content-title-link">
          <span>전체보기</span>
          <div class="material-icons">
            navigate_next
          </div>
        </Link>
      </div>
      <div className="content-content-wrap">
        {Contents.map((content, index) => (
          <a href={content.link} className="content-content" key={index} target="_blank" rel="noopener noreferrer">
            <img src={`${API_URL}/${content?.image}`} alt="content_image" />
            <div className="bg">
              <img src="/images/play_icon.png" alt="play_icon" />
            </div>
            <div className="content-info">
              <div className="content-title">
                <img src={`${API_URL}/${content.profile}`} alt="profile" />
                <h3>{content.title}</h3>
              </div>
              <div className="content-creator">
                <h4>Creator</h4>
                <h4>{content.creator}</h4>
              </div>
              <div className="content-data">
                <h5>조회수 1만회</h5>
                <h5>{dayjs().date()-dayjs(content.createdAt).date()}일전</h5>
              </div>    
            </div>
          </a>
          ))
        }
      </div>
      
      <div className="mob-content-content-wrap">
        <Swiper slidesPerView={1}> 
          {Contents.map((content, index) => (
            <SwiperSlide>
              <a href={content.link} className="content-content" key={index} target="_blank" rel="noopener noreferrer">
                <img src={`${API_URL}/${content.image}`} alt="content_image" />
                <div className="bg">
                  <img src="/images/play_icon.png" alt="play_icon" />
                </div>
                <div className="content-info">
                  <div className="content-title">
                    <img src={`${API_URL}/${content.profile}`} alt="profile" />
                    <h3>{content.title}</h3>
                  </div>
                  <div className="content-creator">
                    <h4>Creator</h4>
                    <h4>{content.creator}</h4>
                  </div>
                  <div className="content-data">
                    <h5>조회수 1만회</h5>
                    <h5>{dayjs().date()-dayjs(content.createdAt).date()}일전</h5>
                  </div>    
                </div>
              </a>
            </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default NewContent;
