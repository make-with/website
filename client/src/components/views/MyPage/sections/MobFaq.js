import '../MyPage.css';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function MobFaq() {
  const [A1, setA1] = useState(false);
  const [A2, setA2] = useState(false);
  const [A3, setA3] = useState(false);
  const [A4, setA4] = useState(false);
  const [A5, setA5] = useState(false);
  const [A6, setA6] = useState(false);
  const [A7, setA7] = useState(false);
  const [A8, setA8] = useState(false);
  const [A9, setA9] = useState(false);
  const [A10, setA10] = useState(false);

  const a1Handler = () => {
    setA1(!A1);
  };
  const a2Handler = () => {
    setA2(!A2);
  };
  const a3Handler = () => {
    setA3(!A3);
  };
  const a4Handler = () => {
    setA4(!A4);
  };
  const a5Handler = () => {
    setA5(!A5);
  };
  const a6Handler = () => {
    setA6(!A6);
  };
  const a7Handler = () => {
    setA7(!A7);
  };
  const a8Handler = () => {
    setA8(!A8);
  };
  const a9Handler = () => {
    setA9(!A9);
  };
  const a10Handler = () => {
    setA10(!A10);
  };

  return (
    <div className="faq-mode">
      <h2 className="ask">청원</h2>
      <div className="content-info">
        <div className="question" onClick={a1Handler}>
          <p>Q. 청원에서 펀딩으로 전환되는 기준이 무엇인가요?</p>
          <div className="material-icons">expand_{A1 ? 'less' : 'more'}</div>
        </div>
        {A1 && (
          <p className="answer">A. 청원 응원수가 100개를 넘어야 합니다.</p>
        )}

        <div className="question" onClick={a2Handler}>
          <p>Q. 응원수가 100개를 넘지 못하면 어떻게 되나요?</p>
          <div className="material-icons">expand_{A2 ? 'less' : 'more'}</div>
        </div>
        {A2 && (
          <p className="answer">
            A. 청원은 종료되고 크리에이터에게 따로 제안이 가지 않습니다.
          </p>
        )}

        <div className="question" onClick={a3Handler}>
          <p>Q. 응원을 많이 받으려면 어떻게 해야하나요?</p>
          <div className="material-icons">expand_{A3 ? 'less' : 'more'}</div>
        </div>
        {A3 && (
          <p className="answer">
            A. 링크를 복사해 다른 사람에게 홍보하는 것이 좋습니다.
          </p>
        )}

        <div className="question" onClick={a4Handler}>
          <p>Q. 응원수 충족시 무조건 펀딩으로 전환되나요?</p>
          <div className="material-icons">expand_{A4 ? 'less' : 'more'}</div>
        </div>
        {A4 && (
          <p className="answer">
            A. 크리에이터의 의사에 따라 펀딩 진행이 불가할 수 있습니다.
          </p>
        )}

        <div className="question" onClick={a5Handler}>
          <p>Q. 내가 올린 청원이 펀딩으로 진행되면 어떤 혜택을 얻나요?</p>
          <div className="material-icons">expand_{A5 ? 'less' : 'more'}</div>
        </div>
        {A5 && (
          <p className="answer">
            A. 작성자에게는 10000 포인트가 따로 지급됩니다.
          </p>
        )}
      </div>

      <h2 className="funding">펀딩</h2>
      <div className="content-info">
        <div className="question" onClick={a6Handler}>
          <p>Q. 펀딩이 성공해서 콘텐츠로 제작되는 기준이 무엇인가요?</p>
          <div className="material-icons">expand_{A6 ? 'less' : 'more'}</div>
        </div>
        {A6 && <p className="answer">A. 펀딩 달성률이 100%를 넘어야 합니다.</p>}

        <div className="question" onClick={a7Handler}>
          <p>Q. 펀딩에 실패하면 어떻게 되나요?</p>
          <div className="material-icons">expand_{A7 ? 'less' : 'more'}</div>
        </div>
        {A7 && (
          <p className="answer">
            A. 펀딩은 종료되고 결제된 금액은 모두 환불 처리됩니다.
          </p>
        )}

        <div className="question" onClick={a8Handler}>
          <p>Q. 광고주 투표는 무엇인가요?</p>
          <div className="material-icons">expand_{A8 ? 'less' : 'more'}</div>
        </div>
        {A8 && (
          <p className="answer">
            A. 펀딩중인 콘텐츠와 가장 어울리는 광고/협찬을 투표할 수 있습니다.
          </p>
        )}

        <div className="question" onClick={a9Handler}>
          <p>Q. 펀딩 결제 최소 금액과 최대 금액은 무엇인가요?</p>
          <div className="material-icons">expand_{A9 ? 'less' : 'more'}</div>
        </div>
        {A9 && (
          <p className="answer">
            A. 개인당 최소 결제 금액은 5,000원이며 최대 500,000까지 가능합니다.
          </p>
        )}

        <div className="question" onClick={a10Handler}>
          <p>Q. 펀딩이 성공하면 콘텐츠는 언제 업로드 되나요?</p>
          <div className="material-icons">expand_{A10 ? 'less' : 'more'}</div>
        </div>
        {A10 && (
          <p className="answer">
            A. 크리에이터는 최대 30일 내 해당 콘텐츠를 업로드 해야합니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default withRouter(MobFaq);
