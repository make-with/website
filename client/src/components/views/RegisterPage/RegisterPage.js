import './RegisterPage.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Name, setName] = useState('');
  const [Id, setId] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }

    let body = {
      name: Name,
      id: Id,
      email: Email,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    });
  };

  const idConfirm = (event) => {
    event.preventDefault();
    alert('사용 가능한 아이디입니다.');
  };
  const emailConfirm = (event) => {
    event.preventDefault();
    alert('사용 가능한 이메일입니다.');
  };

  return (
    <section className="register">
      <div className="inner">
        <div className="register-box">
          <form onSubmit={onSubmitHandler}>
            <div className="name-wrap">
              <label>이름</label>
              <input type="text" value={Name} onChange={onNameHandler} />
            </div>
            <div className="id-wrap">
              <div className="id">
                <label>아이디</label>
                <input type="text" value={Id} onChange={onIdHandler} />
              </div>
              <button className="confirm" onClick={idConfirm}>
                중복확인
              </button>
            </div>
            <div className="email-wrap">
              <div className="email">
                <label>이메일</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
              </div>
              <button className="confirm" onClick={emailConfirm}>
                중복확인
              </button>
            </div>
            <div className="password-wrap">
              <label>비밀번호</label>
              <input
                type="password"
                value={Password}
                onChange={onPasswordHandler}
                placeholder="숫자와 특수문자를 포함한 8자 이상의 비밀번호"
              />
            </div>
            <div className="confirm-password-wrap">
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
                placeholder="숫자와 특수문자를 포함한 8자 이상의 비밀번호"
              />
            </div>
            <div className="agreement">
              <div>
                <input type="checkbox" checked />
                <label>전체동의</label>
              </div>
              <div>
                <input type="checkbox" checked />
                <label>서비스 이용약관 동의 (필수)</label>
              </div>
              <div>
                <input type="checkbox" checked />
                <label>개인정보 수집 및 이용 동의 (필수)</label>
              </div>
              <div>
                <input type="checkbox" checked />
                <label>광고성 정보 수신 동의 (선택)</label>
              </div>
            </div>
            <button className="submit" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(RegisterPage);
