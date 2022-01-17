import './ProfileEditPage.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function ProfileEditPage(props) {
  const [Image, setImage] = useState('');
  const [Password, setPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onNewPasswordHandler = (event) => {
    setNewPassword(event.currentTarget.value);
  };
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/profile/image', formData, config).then((response) => {
      if (response.data.success) {
        setImage(response.data.filePath);
      } else {
        alert('파일 저장에 실패했습니다.');
      }
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // if(user.userData?.password !== Password) {
    //   return alert('비밀번호가 일치하지 않습니다.')
    // };

    // if(user.userData?.password !== NewPassword) {
    //   return alert('새로운 비밀번호는 기존 비밀번호와 달라야 합니다.')
    // };
    if (NewPassword) {
      let body = {
        userId: userId,
        password: NewPassword,
      };

      axios.post('/api/profile/upload', body).then((response) => {
        if (response.data.success) {
          alert('프로필 편집에 성공했습니다.');
          props.history.push('/mypage');
        } else {
          alert('프로필 편집에 실패했습니다.');
        }
      });
    }
    if (Image) {
      let body = {
        userId: userId,
        image: Image,
      };

      axios.post('/api/profile/upload', body).then((response) => {
        if (response.data.success) {
          alert('프로필 편집에 성공했습니다.');
          props.history.push('/mypage');
        } else {
          alert('프로필 편집에 실패했습니다.');
        }
      });
    }
  };

  return (
    <section className="profile-edit">
      <div className="inner">
        <div className="profile-edit-box">
          <form onSubmit={onSubmitHandler}>
            <div className="image">
              <div className="image-upload">
                {user.userData?.image ? (
                  <img
                    src={`${API_URL}/${user.userData?.image}`}
                    alt="profile"
                  />
                ) : (
                  <img src="/images/profile.png" alt="profile" />
                )}
                <img src="/images/profile_upload.png" alt="profile_upload" />
                <Dropzone onDrop={dropHandler}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="file-upload" {...getRootProps()}>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </div>
              {Image && (
                <div className="image-file-upload">
                  <img src={`${API_URL}/${Image}`} alt="upload_image" />
                </div>
              )}
            </div>
            <div className="name">
              <label>이름</label>
              <span>{user.userData?.name}</span>
            </div>
            <hr />
            <div className="id">
              <label>아이디</label>
              <span>{user.userData?.id}</span>
            </div>
            <hr />
            <div className="email">
              <label>이메일</label>
              <span>{user.userData?.email}</span>
            </div>
            <hr />
            <div className="password">
              <label>기존 비밀번호</label>
              <input
                type="password"
                value={Password}
                onChange={onPasswordHandler}
                placeholder="기존 비밀번호를 입력해 주세요."
              />
            </div>
            <hr />
            <div className="new-password">
              <label>변경할 비밀번호</label>
              <input
                type="password"
                value={NewPassword}
                onChange={onNewPasswordHandler}
                placeholder="변경할 비밀번호를 입력해 주세요."
              />
            </div>
            <div className="btn">
              <Link to="/mypage">
                <button className="cancel">취소</button>
              </Link>
              <button type="submit" className="submit">
                회원정보 수정
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(ProfileEditPage);
