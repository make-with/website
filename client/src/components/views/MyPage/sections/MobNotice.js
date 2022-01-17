import '../MyPage.css';
import React from 'react';
import { withRouter } from 'react-router-dom';

function MobNotice() {
  return (
    <div className="notice-mode">
      <img src="/images/notice_icon.png" alt="notice_icon" />
      <p>아직 받은 알림이 없어요.</p>
    </div>
  );
}

export default withRouter(MobNotice);
