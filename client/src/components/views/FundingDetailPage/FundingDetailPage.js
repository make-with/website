import './FundingDetailPage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Comment from './sections/Comment';
import Copy from '../AskDetailPage/sections/Copy';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function FundingDetailPage(props) {
  const fundingId = props.match.params.fundingId;
  const [Funding, setFunding] = useState({});
  const [Comments, setComments] = useState([]);
  const [CommentNumber, setCommentNumber] = useState(0);

  let body = { fundingId: fundingId };

  useEffect(() => {
    axios
      .get(`/api/funding/fundings_by_id?id=${fundingId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setFunding(response.data.fundingInfo[0]);
        } else {
          alert('펀딩 상세를 가져오는데 실패했습니다.');
        }
      });

    axios.post('/api/funding/comment/getcomment', body).then((response) => {
      if (response.data.success) {
        setComments(response.data.fundingComments);
        setCommentNumber(response.data.fundingComments.length);
      } else {
        alert('댓글을 가져오는데 실패했습니다.');
      }
    });
    //eslint-disable-next-line
  }, []);

  const updateComment = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  return (
    <section className="funding-detail">
      <div className="inner">
        <div className="funding-detail-box">
          <h2>{Funding.title}</h2>
          <div className="creator">
            <h3>Creator</h3>
            <h3>{Funding.creator}</h3>
          </div>
          <div className="funding-content-wrap">
            <img
              src={`${API_URL}/${Funding.image}`}
              alt="funding_detail_image"
            />
            <div className="funding-info-wrap">
              <span>
                &#8361;{' '}
                {Funding.pay?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
              <div className="gauge-bar"></div>
              <div className="funding-info">
                <div className="key">
                  <h4>목표금액</h4>
                  <h4>달성률</h4>
                  <h4>펀딩마감</h4>
                </div>
                <div className="value">
                  <h5>
                    {Funding.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </h5>
                  <h5>{(Funding.pay / Funding.price) * 100}%</h5>
                  <h5>
                    D-{dayjs(Funding.createdAt).date() + 30 - dayjs().date()}
                  </h5>
                </div>
                <div className="btn">
                  <Copy />
                  <button className="pay">응원하기</button>
                  {/* <Paypal /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mob-btn">
            <Copy />
            <button className="pay">응원하기</button>
            {/* <Paypal /> */}
          </div>
          <div className="funding-detail-content">
            <h6>펀딩 상세내용</h6>
            <p>{Funding.content}</p>
          </div>
          <hr />
          <Comment
            comments={Comments}
            fundingId={fundingId}
            update={updateComment}
            commentNumber={CommentNumber}
          />
        </div>
      </div>
    </section>
  );
}

export default withRouter(FundingDetailPage);
