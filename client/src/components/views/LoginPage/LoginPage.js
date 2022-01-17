import './LoginPage.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      id: Id,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
        localStorage.setItem('userId', response.payload.userId);
      } else {
        alert('로그인에 실패했습니다.');
      }
    });
  };
  const loginHandler1 = (event) => {
    event.preventDefault();
    alert('서비스 준비중입니다.');
  };
  const loginHandler2 = (event) => {
    event.preventDefault();
    alert('서비스 준비중입니다.');
  };

  return (
    <section className="login">
      <div className="inner">
        <div className="login-box">
          <form onSubmit={onSubmitHandler}>
            <label className="id">아이디</label>
            <input type="text" value={Id} onChange={onIdHandler} />
            <label className="password">비밀번호</label>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            />
            <div className="login-option">
              <div className="auto-login">
                <label>자동로그인</label>
                <input type="checkbox" checked />
              </div>
              <a href="/" className="find-id">
                아이디/비밀번호 찾기
              </a>
            </div>
            <button className="login-btn" type="submit">
              로그인
            </button>
            <div className="signin">
              <p>아직 메이크위드 회원이 아니신가요?</p>
              <Link to="/register">회원가입</Link>
            </div>
            <div className="sns-login">
              <Link to="/login" className="naver-login-btn">
                <img
                  src="/images/naver_login_icon.png"
                  alt="naver_login_icon"
                />
                <span onClick={loginHandler1}>네이버로 로그인하기</span>
              </Link>
              <Link to="/login" className="kakao-login-btn">
                <img
                  src="/images/kakao_login_icon.png"
                  alt="kakao_login_icon"
                />
                <span onClick={loginHandler2}>카카오로 로그인하기</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(LoginPage);
