import './Header.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function Header(props) {
  const user = useSelector((state) => state.user);
  const [color1, setcolor1] = useState(false);
  const [color2, setcolor2] = useState(false);
  const [color3, setcolor3] = useState(false);

  const onLogoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        props.history.push('/login');
        localStorage.removeItem('userId');
      } else {
        alert('로그아웃에 실패했습니다.');
      }
    });
  };

  const colorHandler = () => {
    setcolor1(false);
    setcolor2(false);
    setcolor3(false);
  };
  const color1Handler = () => {
    setcolor2(false);
    setcolor3(false);
    setcolor1(false);
  };
  const color2Handler = (event) => {
    event.preventDefault();

    alert('서비스 준비중입니다.');
    setcolor1(false);
    setcolor3(false);
    setcolor2(false);
  };
  const color3Handler = (event) => {
    event.preventDefault();

    alert('서비스 준비중입니다.');
    setcolor1(false);
    setcolor2(false);
    setcolor3(false);
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <header>
        <div className="inner">
          <nav className="pc">
            <div className="logo" onClick={colorHandler}>
              <Link to="/">
                <img src={'/images/logo.png'} alt="logo" />
              </Link>
            </div>

            <ul className="gnb">
              <li>
                <Link
                  to="/"
                  onClick={color1Handler}
                  style={color1 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  청원하기
                </Link>
              </li>
              <li>
                <Link
                  to="/funding"
                  onClick={color2Handler}
                  style={color2 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 펀딩
                </Link>
              </li>
              <li>
                <Link
                  to="/content"
                  onClick={color3Handler}
                  style={color3 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 보기
                </Link>
              </li>
            </ul>

            <ul className="lnb">
              <li>
                <Link to="/login" onClick={colorHandler}>
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={colorHandler}>
                  회원가입
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="mob">
            <div className="nav-wrap">
              <div className="logo" onClick={colorHandler}>
                <Link to="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              </div>
              <ul className="lnb">
                <li>
                  <Link to="/login" onClick={colorHandler}>
                    로그인
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="gnb">
              <li>
                <Link
                  to="/"
                  onClick={color1Handler}
                  style={color1 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  청원하기
                </Link>
              </li>
              <li>
                <Link
                  to="/funding"
                  onClick={color2Handler}
                  style={color2 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 펀딩
                </Link>
              </li>
              <li>
                <Link
                  to="/content"
                  onClick={color3Handler}
                  style={color3 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 보기
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="inner">
          <nav className="pc">
            <div className="logo" onClick={colorHandler}>
              <Link to="/">
                <img src="/images/logo.png" alt="logo" />
              </Link>
            </div>

            <ul className="gnb">
              <li>
                <Link
                  to="/"
                  onClick={color1Handler}
                  style={color1 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  청원하기
                </Link>
              </li>
              <li>
                <Link
                  to="/funding"
                  onClick={color2Handler}
                  style={color2 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 펀딩
                </Link>
              </li>
              <li>
                <Link
                  to="/content"
                  onClick={color3Handler}
                  style={color3 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 보기
                </Link>
              </li>
            </ul>

            <ul className="lnb">
              <li className="profile-wrap" onClick={colorHandler}>
                <div className="profile">
                  {user.userData?.image ? (
                    <img
                      src={`${API_URL}/${user.userData?.image}`}
                      alt="profile"
                    />
                  ) : (
                    <img src="/images/profile.png" alt="profile" />
                  )}
                  <span>{user.userData?.id} 님</span>
                </div>
                <div className="user" onClick={colorHandler}>
                  <div>
                    <Link to="/mypage">내정보</Link>
                  </div>
                  <div onClick={onLogoutHandler}>로그아웃</div>
                </div>
              </li>
            </ul>
          </nav>

          <nav className="mob">
            <div className="nav-wrap">
              <div className="logo" onClick={colorHandler}>
                <Link to="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              </div>
              <ul className="lnb">
                <li className="profile-wrap" onClick={colorHandler}>
                  <Link to="/mypage" className="profile">
                    {user.userData?.image ? (
                      <img
                        src={`${API_URL}/${user.userData?.image}`}
                        alt="profile"
                      />
                    ) : (
                      <img src="/images/profile.png" alt="profile" />
                    )}
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="gnb">
              <li>
                <Link
                  to="/"
                  onClick={color1Handler}
                  style={color1 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  청원하기
                </Link>
              </li>
              <li>
                <Link
                  to="/funding"
                  onClick={color2Handler}
                  style={color2 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 펀딩
                </Link>
              </li>
              <li>
                <Link
                  to="/content"
                  onClick={color3Handler}
                  style={color3 ? { color: '#f9714b' } : { color: '#404040' }}
                >
                  콘텐츠 보기
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
