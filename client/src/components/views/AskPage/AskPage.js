import './AskPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import BestLikeAsk from './sections/BestLikeAsk';
import BestViewAsk from './sections/BestViewAsk';
import Search from './sections/Search';
import Pagination from './sections/Pagination';
import Likes from './sections/Likes';
import { withRouter } from 'react-router-dom';

function AskPage() {
  const [Asks, setAsks] = useState([]);
  //eslint-disable-next-line
  const [SearchTerm, setSerchTerm] = useState('');
  //eslint-disable-next-line
  const [LikeNumber, setLikeNumber] = useState(0);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [AsksPerPage] = useState(15);

  const indexOfLastAsk = CurrentPage * AsksPerPage;
  const indexOfFirstAsk = indexOfLastAsk - AsksPerPage;
  const currentAsks = Asks.slice(indexOfFirstAsk, indexOfLastAsk);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect((body) => {
    getAsks(body);
    //eslint-disable-next-line
  }, []);

  const getAsks = (body) => {
    axios.post('/api/ask', body).then((response) => {
      if (response.data.success) {
        setAsks(response.data.askInfo);
      } else {
        alert('청원 목록을 가져오는데 실패했습니다.');
      }
    });
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      SearchTerm: newSearchTerm,
    };
    getAsks(body);
    setSerchTerm(newSearchTerm);
  };

  const updateLikeNumber = (newLikeNumber) => {
    setLikeNumber(newLikeNumber);
  };

  return (
    <section className="ask">
      <div className="inner">
        <div className="ask-box">
          <div className="ask-banner">
            <img
              src="/images/ask_promotion.png"
              alt="ask_promotion"
              className="pc"
            />
            <img
              src="/images/mob_ask_promotion.png"
              alt="mob_ask_promotion"
              className="mob"
            />
            <Link to="/ask/upload">청원하기</Link>
          </div>
          <BestLikeAsk />
          <BestViewAsk />
          <div className="ask-board">
            <div className="ask-title-wrap">
              <div className="ask-title">
                <h2>전체 청원 게시글</h2>
                <p>청원 게시글을 둘러보고 응원해보세요!</p>
              </div>
              <Search update={updateSearchTerm} />
            </div>
            <div className="ask-table">
              <div className="thead">
                <div className="number">No.</div>
                <div className="creator">크리에이터</div>
                <div className="title">제목</div>
                <div className="likes">응원수</div>
                <div className="dday">D-day</div>
                <div className="writer">작성자</div>
              </div>
              <div className="tbody">
                {currentAsks.map((ask, index) => (
                  <Link to={`/ask/${ask._id}`} key={index}>
                    <div className="number">{`${index + 1}.`}</div>
                    <div className="creator">{ask.creator}</div>
                    <div className="title">{ask.title}</div>
                    <div className="likes">
                      <Likes
                        askId={ask._id}
                        update={updateLikeNumber}
                        currentPage={CurrentPage}
                      />
                    </div>
                    <div className="dday">
                      D-{dayjs(ask.createdAt).date() + 7 - dayjs().date()}
                    </div>
                    <div className="writer">{ask.writer.id}</div>
                  </Link>
                ))}
              </div>
              <Pagination
                asksPerPage={AsksPerPage}
                totalAsks={Asks.length}
                currentPage={CurrentPage}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(AskPage);
