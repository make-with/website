import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import RestFunding from './RestFunding';
import MobFunding from './MobFunding';
import {API_URL} from '../../../../url/url';
import {Link} from 'react-router-dom'; 

function BestFunding() {
  const [Fundings, setFundings] = useState([]);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(1);

  useEffect(() => {
    let body = {
      limit: Limit
    }
    getFundings(body)
  //eslint-disable-next-line
  }, []);

  const getFundings = (body) => {
    axios.post('/api/funding/like', body)
    .then(response => {
      if(response.data.success) {
        setFundings(response.data.fundingInfo)
      } else {
        alert('인기 펀딩 목록을 가져오는데 실패했습니다.')
      };
    });
  };

  return (
    <div className="best-funding">
      <div className="funding-title-wrap">
        <h2>인기 콘텐츠 펀딩 Top 4</h2>
        <p>인기 콘텐츠 펀딩에 참여해보세요!</p>
      </div>
      <div className="funding-content-wrap">
        {Fundings.map((funding, index) => (
          <Link to={`/funding/${funding._id}`} className="funding-content" key={index}>
            <img src={`${API_URL}/${funding.image}`} alt="funding_image" />
            <div className="funding-info">
              <div className="funding-title">
                <h3>D-{
                    dayjs(funding.createdAt).date()+30-dayjs().date()
                    }</h3>
                <h4>{funding.title}</h4>
              </div>
              <div className="funding-creator">
                <h5>Creator</h5>
                <h5>{funding.creator}</h5>
              </div>
              <div className="gauge-bar"></div>
              <div className="funding-rate">
                <span>{funding.pay/funding.price*100}%</span>
                <h6>{funding.pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h6>
              </div>
            </div>
          </Link>
          ))
        }
        <RestFunding />
        <MobFunding />
      </div>
    </div>
  )
}

export default BestFunding;