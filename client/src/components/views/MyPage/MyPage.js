import './MyPage.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LikeAsk from './sections/LikeAsk';
import PayFunding from './sections/PayFunding';
import Notice from './sections/Notice';
import Faq from './sections/Faq';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function MyPage(props) {
  const [LikeMode, setLikeMode] = useState(true);
  const [PayMode, setPayMode] = useState(false);
  const [NoticeMode, setNoticeMode] = useState(false);
  const [FaqMode, setFaqMode] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');

  const onLogoutHandler = (event) => {
    event.preventDefault();

    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
        localStorage.removeItem('userId');
      } else {
        alert('로그아웃에 실패했습니다.');
      }
    });
  };

  const likeHandler = () => {
    setPayMode(false);
    setNoticeMode(false);
    setFaqMode(false);
    setLikeMode(true);
  };
  const payHandler = () => {
    setLikeMode(false);
    setNoticeMode(false);
    setFaqMode(false);
    setPayMode(true);
  };
  const noticeHandler = () => {
    setLikeMode(false);
    setPayMode(false);
    setFaqMode(false);
    setNoticeMode(true);
  };
  const faqHandler = () => {
    setLikeMode(false);
    setPayMode(false);
    setNoticeMode(false);
    setFaqMode(true);
  };

  return (
    <section className="mypage">
      <div className="inner">
        <div className="mypage-box">
          <div className="nav-wrap">
            <div className="profile">
              {user.userData?.image ? (
                <img src={`${API_URL}/${user.userData?.image}`} alt="profile" />
              ) : (
                <img src="/images/profile.png" alt="profile" />
              )}
              <div className="profile-edit">
                <span>{user.userData?.id}</span>
                <Link to="/mypage/profile">
                  <img src="/images/edit_icon.png" alt="edit_icon" />
                  <h2>프로필 편집</h2>
                </Link>
              </div>
            </div>
            <nav>
              <button
                onClick={likeHandler}
                style={LikeMode ? { color: '#f9714b' } : { color: '#404040' }}
              >
                응원
              </button>
              <button
                onClick={payHandler}
                style={PayMode ? { color: '#f9714b' } : { color: '#404040' }}
              >
                결제
              </button>
              <button
                onClick={noticeHandler}
                style={NoticeMode ? { color: '#f9714b' } : { color: '#404040' }}
              >
                알림
              </button>
              <button
                onClick={faqHandler}
                style={FaqMode ? { color: '#f9714b' } : { color: '#404040' }}
              >
                FAQ
              </button>
            </nav>
            <hr />
            <LikeAsk userId={userId} />
            <PayFunding userId={userId} />
            <hr />
            <nav className="mob-nav">
              <Link to="/mypage/notice">알림</Link>
              <Link to="/mypage/faq">FAQ</Link>
              <Link to="/" onClick={onLogoutHandler}>
                로그아웃
              </Link>
            </nav>
          </div>
          {LikeMode && <LikeAsk userId={userId} />}
          {PayMode && <PayFunding userId={userId} />}
          {NoticeMode && <Notice />}
          {FaqMode && <Faq />}
        </div>
      </div>
    </section>
  );
}

export default withRouter(MyPage);
