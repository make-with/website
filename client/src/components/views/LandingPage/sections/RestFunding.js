import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'; 
import {API_URL} from '../../../../url/url';

function RestFunding() {
  const [Fundings, setFundings] = useState([]);
  //eslint-disable-next-line
  const [Limit, setLimit] = useState(3);
  //eslint-disable-next-line
  const [Skip, setSkip] = useState(1);

  useEffect(() => {
    let body = {
      skip: Skip,
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
    <div className="rest-funding">
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
    </div>
  )
}

export default RestFunding;