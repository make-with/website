import './Footer.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Footer() {
  const [Company, setCompany] = useState(false);

  const companyHandler = () => {
    setCompany(!Company);
  };

  return (
    <footer>
      <div className="inner">
        <div className="footer-box">
          <div className="company">
            <Link to="/">회사소개</Link>
            <Link to="/">이용약관</Link>
            <Link to="/">개인정보처리방침</Link>
          </div>
          <div className="icon-wrap">
            <img
              src="/images/footer_logo.png"
              className="footer-logo"
              alt="footer_logo"
            />
            <div className="sns">
              <Link to="/">
                <img src="/images/facebook_icon.png" alt="facebook_icon" />
              </Link>
              <a
                href="http://instagram.com/makewith_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/instagram_icon.png" alt="instagram_icon" />
              </a>
              <Link to="/">
                <img src="/images/youtube_icon.png" alt="youtube_icon" />
              </Link>
              <Link to="/">
                <img src="/images/naver_icon.png" alt="naver_icon" />
              </Link>
            </div>
          </div>
          <div className="info">
            <div className="left-info">
              <p>(주) 메이크위드</p>
              <p>
                대표이사 고승희, 박은빈 / 사업자등록번호 : 350-19-01129
                <br />
                통신판매업신고 : 제2021-서울동대문-0139호
              </p>
              <p>
                서울특별시 마포구 독막로 서울디자인창업센터 3층 303호
                <br />
                개인정보 보호책임자 : 엄태윤 / 개인정보 보호담당자 : 박하영
              </p>
              <span>2021 MAKEWITH, Inc.</span>
            </div>
            <div className="right-info">
              <p>고객센터</p>
              <p>
                평일 : 09:00 ~ 18:00
                <br />
                토/일/공휴일 휴무
              </p>
            </div>
          </div>

          <div className="mob-info">
            <div className="company">
              <p>(주) 메이크위드</p>
              <div className="company-info" onClick={companyHandler}>
                <p>사업자정보</p>
                <div className="material-icons">expand_more</div>
              </div>
            </div>
            {Company && (
              <div className="company-content">
                <p>
                  대표이사 고승희, 박은빈 / 사업자등록번호 : 350-19-01129
                  <br />
                  통신판매업신고 : 제6959-서울강남-15421호
                </p>
                <p>
                  서울특별시 마포구 독막로 서울디자인창업센터 3층 303호
                  <br />
                  개인정보 보호책임자 : 엄태윤 / 개인정보 보호담당자 : 박하영
                </p>
              </div>
            )}
            <div className="contact">
              <p>고객센터</p>
              <p>
                평일 : 09:00 ~ 18:00
                <br />
                토/일/공휴일 휴무
              </p>
            </div>
            <span>2021 MAKEWITH, Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default withRouter(Footer);
