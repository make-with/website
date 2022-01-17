import './FundingPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function FundingPage() {
  const [Fundings, setFundings] = useState([]);
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
    getFundings(body);
    //eslint-disable-next-line
  }, []);

  const getFundings = (body) => {
    axios.post('/api/funding', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setFundings([...Fundings, ...response.data.fundingInfo]);
        } else {
          setFundings(response.data.fundingInfo);
        }
        setPostSize(response.data.PostSize);
      } else {
        alert('펀딩 목록을 가져오는데 실패했습니다.');
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
    getFundings(body);
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
    <section className="funding">
      <div className="inner">
        <div className="funding-box">
          <div className="funding-tab">
            <button>전체 펀딩</button>
            <button>진행중인 펀딩</button>
            <button>종료된 펀딩</button>
          </div>
          <div className="funding-filter-wrap">
            <div className="funding-filter" onClick={filterShowHandler}>
              <h2>
                {BestFilter ? '인기순' : NewFilter ? '최신순' : '마감임박순'}
              </h2>
              {FilterShow ? (
                <React.Fragment>
                  <div className="material-icons">expand_less</div>
                  <div className="funding-filter-btn">
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
          <div className="funding-content-wrap">
            {Fundings.map((funding, index) => (
              <Link
                to={`/funding/${funding._id}`}
                className="funding-content"
                key={index}
              >
                <img src={`${API_URL}/${funding.image}`} alt="funding_image" />
                <div className="funding-info">
                  <div className="funding-title">
                    <h3>
                      D-{dayjs(funding.createdAt).date() + 30 - dayjs().date()}
                    </h3>
                    <h4>{funding.title}</h4>
                  </div>
                  <div className="funding-creator">
                    <h5>Creator</h5>
                    <h5>{funding.creator}</h5>
                  </div>
                  <p>{funding.content}</p>
                </div>
              </Link>
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

export default withRouter(FundingPage);
