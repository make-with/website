import React from 'react';

function Notice() {
  return (
    <div className="content-wrap">
      <h1>알림</h1>
      <hr />
      <h2>내 소식 알림</h2>
      <div className="notice-mode">
        <img src="/images/notice_icon.png" alt="notice_icon" />
        <p>아직 받은 알림이 없어요.</p>
      </div>
    </div>
  );
}

export default Notice;
