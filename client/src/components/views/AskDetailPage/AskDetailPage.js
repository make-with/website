import './AskDetailPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Like from './sections/Like';
import Comment from './sections/Comment';
import Copy from './sections/Copy';
import { withRouter } from 'react-router-dom';

function AskDetailPage(props) {
  const [Ask, setAsk] = useState({});
  const [LikeNumber, setLikeNumber] = useState(0);
  const [Comments, setComments] = useState([]);
  const [CommentNumber, setCommentNumber] = useState(0);
  const userId = localStorage.getItem('userId');
  const askId = props.match.params.askId;
  let body = { askId: askId };

  useEffect(() => {
    axios
      .get(`/api/ask/asks_by_id?id=${askId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setAsk(response.data.askInfo[0]);
        } else {
          alert('청원 상세를 가져오는데 실패했습니다.');
        }
      });

    axios.post('/api/ask/comment/getcomment', body).then((response) => {
      if (response.data.success) {
        setComments(response.data.askComments);
        setCommentNumber(response.data.askComments.length);
      } else {
        alert('댓글을 가져오는데 실패했습니다.');
      }
    });
    //eslint-disable-next-line
  }, []);

  const updateLikeNumber = (newLikeNumber) => {
    setLikeNumber(newLikeNumber);
  };
  const updateComment = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  return (
    <section className="ask-detail">
      <div className="inner">
        <div className="ask-detail-box">
          <h2>{Ask.title}</h2>
          <h3>
            참여인원: [<span>{LikeNumber}</span>명]
          </h3>
          <div className="ask-content-wrap">
            <div className="ask-info-wrap">
              <div className="ask-info">
                <div className="dday">
                  <h4>청원마감</h4>
                  <h5>D-{dayjs(Ask.createdAt).date() + 7 - dayjs().date()}</h5>
                </div>
                <div className="writer">
                  <h4>청원인</h4>
                  <h5>{Ask.writer?.id}</h5>
                </div>
                <div className="creator">
                  <h4>크리에이터</h4>
                  <h5>{Ask.creator}</h5>
                </div>
              </div>
              <div className="sns">
                <Link to="/">
                  <img src="/images/kakao_icon.png" alt="kakao_icon" />
                </Link>
                <a
                  href="http://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/instagram_icon.png" alt="instagram_icon" />
                </a>
                <a
                  href="http://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/facebook_icon.png" alt="facebook_icon" />
                </a>
              </div>
            </div>
            <div className="mob-sns">
              <Link to="/">
                <img src="/images/kakao_icon.png" alt="kakao_icon" />
              </Link>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/instagram_icon.png" alt="instagram_icon" />
              </a>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/facebook_icon.png" alt="facebook_icon" />
              </a>
            </div>
            <div className="ask-step-wrap">
              <hr />
              <div className="ask-step">
                <div className="step1">
                  <div className="circle"></div>
                  <div className="text">청원 심사</div>
                </div>
                <div className="step2">
                  <div className="circle On"></div>
                  <div className="text On">청원 진행중</div>
                </div>
                <div className="step3">
                  <div className="circle"></div>
                  <div className="text">청원 종료</div>
                </div>
                <div className="step4">
                  <div className="circle"></div>
                  <div className="text">펀딩 준비중</div>
                </div>
              </div>
            </div>
            <div className="ask-detail-content">
              <h6>청원 상세내용</h6>
              <p>{Ask.content}</p>
            </div>
          </div>
          <div className="btn">
            <Copy />
            <Like askId={askId} userId={userId} update={updateLikeNumber} />
          </div>
          <hr />
          <Comment
            comments={Comments}
            askId={askId}
            update={updateComment}
            commentNumber={CommentNumber}
          />
        </div>
      </div>
    </section>
  );
}

export default withRouter(AskDetailPage);
