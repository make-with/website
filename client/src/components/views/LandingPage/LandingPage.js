import './LandingPage.css';
import React from 'react';
import Banner from './sections/Banner';
import Notice from './sections/Notice';
import BestFunding from './sections/BestFunding';
import NewFunding from './sections/NewFunding';
import BestLikeAsk from '../AskPage/sections/BestLikeAsk';
import NewContent from './sections/NewContent';
import { withRouter } from 'react-router-dom';

function LandingPage() {
  return (
    <section className="landing">
      <div className="inner">
        <div className="landing-box">
          <Banner />
          <Notice />
          <BestFunding />
          <NewFunding />
          <BestLikeAsk />
          <NewContent />
        </div>
      </div>
    </section>
  );
}

export default withRouter(LandingPage);
