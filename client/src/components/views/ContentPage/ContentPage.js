import './ContentPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function ContentPage() {
  const [Contents, setContents] = useState([]);
  const [Skip, setSkip] = useState(0);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(12);
  const [PostSize, setPostSize] = useState(0);
  const [FilterShow, setFilterShow] = useState(false);
  const [BestFilter, setBestFilter] = useState(true);
  const [NewFilter, setNewFilter] = useState(false);
  //eslint-disable-next-line
  const [DdayFilter, setDdayFilter] = useState(false);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getContents(body);
    //eslint-disable-next-line
  }, []);

  const getContents = (body) => {
    axios.post('/api/content', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setContents([...Contents, ...response.data.contentInfo]);
        } else {
          setContents(response.data.contentInfo);
        }
        setPostSize(response.data.PostSize);
      } else {
        alert('콘텐츠 목록을 가져오는데 실패했습니다.');
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    setSkip(skip);
    getContents(body);
  };
  const filterShowHandler = () => {
    setFilterShow(!FilterShow);
  };
  const bestFilterHandler = () => {
    setNewFilter(false);
    setDdayFilter(false);
    setBestFilter(true);
  };
  const newFilterHandler = () => {
    setBestFilter(false);
    setDdayFilter(false);
    setNewFilter(true);
  };
  const ddayFilterHandler = () => {
    setBestFilter(false);
    setNewFilter(false);
    setDdayFilter(true);
  };

  return (
    <section className="content">
      <div className="inner">
        <div className="content-box">
          <div className="content-filter-wrap">
            <div className="content-filter" onClick={filterShowHandler}>
              <h2>
                {BestFilter ? '인기순' : NewFilter ? '최신순' : '마감임박순'}
              </h2>
              {FilterShow ? (
                <React.Fragment>
                  <div className="material-icons">expand_less</div>
                  <div className="content-filter-btn">
                    <button onClick={bestFilterHandler}>인기순</button>
                    <button onClick={newFilterHandler}>최신순</button>
                    <button onClick={ddayFilterHandler}>마감임박순</button>
                  </div>
                </React.Fragment>
              ) : (
                <div className="material-icons">expand_more</div>
              )}
            </div>
          </div>
          <div className="content-content-wrap">
            {Contents.map((content, index) => (
              <a
                href={content.link}
                className="content-content"
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                    <h5>
                      {dayjs().date() - dayjs(content.createdAt).date()}일전
                    </h5>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {PostSize >= Limit && (
            <button onClick={loadMoreHandler} className="load-more">
              <h6>더보기</h6>
              <div className="material-icons">expand_more</div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default withRouter(ContentPage);
