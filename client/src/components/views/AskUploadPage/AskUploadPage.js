import './AskUploadPage.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { API_URL } from '../../../url/url';
import { withRouter } from 'react-router-dom';

function AskUploadPage(props) {
  const [Creator, setCreator] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [Image, setImage] = useState('');
  const user = useSelector((state) => state.user);

  const onCreatorHandler = (event) => {
    setCreator(event.currentTarget.value);
  };
  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };
  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/ask/image', formData, config).then((response) => {
      if (response.data.success) {
        setImage(response.data.filePath);
      } else {
        alert('파일 저장에 실패했습니다.');
      }
    });
  };
  const deleteHandler = () => {
    if (Image) {
      setImage('');
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!Creator || !Title || !Content || !Image) {
      return alert('모든 필드를 입력해주세요.');
    }

    let body = {
      writer: user.userData._id,
      creator: Creator,
      title: Title,
      content: Content,
      image: Image,
    };

    axios.post('/api/ask/upload', body).then((response) => {
      if (response.data.success) {
        alert('청원 등록에 성공했습니다.');
        props.history.push('/');
      } else {
        alert('청원 등록에 실패했습니다.');
      }
    });
  };

  return (
    <section className="ask-upload">
      <div className="inner">
        <div className="ask-upload-box">
          <div className="ask-caution">
            <img src="/images/ask_caution.png" alt="ask_caution" />
          </div>
          <div className="mob-ask-caution">
            <img src="/images/ask_caution1.png" alt="ask_caution1" />
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="writer-wrap">
              <div className="writer">
                <label>청원인</label>
                <p>실제 펀딩에서는 청원인이 표시되지 않습니다.</p>
              </div>
              <input type="text" placeholder={user.userData?.id} disabled />
            </div>

            <hr />

            <div className="creator-wrap">
              <div className="creator">
                <label>
                  크리에이터<b>*</b>
                </label>
                <p>
                  실제 유튜브 크리에이터 채널명을 작성해주세요!
                  <br />
                  <span>
                    &#8251; 채널명이 확인되지 않을 시 청원이 진행되지 않을 수
                    있습니다.
                  </span>
                </p>
              </div>
              <textarea
                value={Creator}
                onChange={onCreatorHandler}
                maxLength="10"
                wrap="physical"
                placeholder="ex) 진용진, 땡깡, 쯔양 (등)"
              ></textarea>
            </div>

            <hr />

            <div className="title-wrap">
              <div className="title">
                <label>
                  청원 제목<b>*</b>
                </label>
                <p>
                  청원이 채택되도록 간단명료하고 임팩트있는 제목을 작성해주세요!
                </p>
              </div>
              <textarea
                value={Title}
                onChange={onTitleHandler}
                maxLength="30"
                wrap="physical"
                placeholder="ex) 땡깡 X 스우파 'Hey Mama' 콜라보"
              ></textarea>
            </div>

            <hr />

            <div className="content-wrap">
              <div className="content">
                <label>
                  청원 내용<b>*</b>
                </label>
                <p>
                  청원을 진행하고자 하는 내용과 그 이유를 상세하게 작성해주세요!
                </p>
              </div>
              <textarea
                value={Content}
                onChange={onContentHandler}
                maxLength="300"
                wrap="physical"
                placeholder="ex) 요즘 스우파에 빠져있는데, 스우파 언니들이랑 땡깡 heymama 콜라보 보고싶어요!"
              ></textarea>
            </div>

            <hr />

            <div className="image-wrap">
              <div className="image">
                <label>
                  콘텐츠 펀딩 대표 이미지<b>*</b>
                </label>
                <p>
                  펀딩진행시 펀딩 내용을 쉽게 파악할 수 있도록 이미지를
                  등록해주세요!
                </p>
              </div>
              <div className="image-upload-box">
                <div className="image-upload-wrap">
                  <img
                    src="/images/image_upload_icon.png"
                    alt="image_upload_icon"
                  />
                  <div className="image-upload">
                    <label className="upload-btn">
                      <img src="/images/upload_icon.png" alt="upload_icon" />
                      <span>이미지 업로드</span>
                    </label>
                    <Dropzone onDrop={dropHandler}>
                      {({ getRootProps, getInputProps }) => (
                        <div className="file-upload" {...getRootProps()}>
                          <input {...getInputProps()} />
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <p>
                    파일형식은 png 또는 jpeg로
                    <br />
                    최적화된 사이즈는 1280x720 입니다.
                  </p>
                </div>
                {Image && (
                  <div className="image-file-upload" onClick={deleteHandler}>
                    <img src={`${API_URL}/${Image}`} alt="upload_image" />
                  </div>
                )}
              </div>
            </div>
            <div className="btn">
              <Link to="/">
                <button className="cancel">취소</button>
              </Link>
              <button type="submit" className="submit">
                작성완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(AskUploadPage);
