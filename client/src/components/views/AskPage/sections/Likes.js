import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Likes(props) {
  const [LikeNumber, setLikeNumber] = useState(0);

  let body = { askId: props.askId };

  useEffect(() => {
    axios.post('/api/like', body).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likes.length);
        props.update(response.data.likes.length);
      } else {
        alert('응원 데이터를 가져오는데 실패했습니다.');
      }
    });
    //eslint-disable-next-line
  }, [props.currentPage]);

  return <React.Fragment>{LikeNumber}</React.Fragment>;
}

export default Likes;
