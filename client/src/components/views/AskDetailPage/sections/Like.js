import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Like(props) {
  const [LikeNumber, setLikeNumber] = useState(0);
  const [Liked, setLiked] = useState(false);
  let body = { askId: props.askId, userId: props.userId };

  useEffect(() => {
    axios.post('/api/like', body).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likes.length);
        props.update(response.data.likes.length);
        //eslint-disable-next-line
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLiked(true);
          }
        });
      } else {
        alert('응원 데이터를 가져오는데 실패했습니다.');
      }
    });
    //eslint-disable-next-line
  }, []);

  const onLike = () => {
    if (props.userId) {
      if (Liked === false) {
        axios.post('/api/like/uplike', body).then((response) => {
          if (response.data.success) {
            setLikeNumber(LikeNumber + 1);
            setLiked(true);
            alert(
              '응원을 완료하였습니다.\n응원한 청원내역은 마이페이지에서 확인 가능합니다.',
            );
          } else {
            alert('응원하기에 실패했습니다.');
          }
        });
      } else {
        axios.post('/api/like/downlike', body).then((response) => {
          if (response.data.success) {
            setLikeNumber(LikeNumber - 1);
            setLiked(false);
            alert('응원을 취소하였습니다.');
          } else {
            alert('응원취소에 실패했습니다.');
          }
        });
      }
    } else {
      props.history.push('/login');
    }
  };

  return (
    <button
      className="like"
      onClick={onLike}
      style={
        Liked
          ? { backgroundColor: 'rgba(249, 113, 75, 0.6)' }
          : { backgroundColor: '#f9714b' }
      }
    >
      {Liked ? '응원완료' : '응원하기'}
    </button>
  );
}

export default withRouter(Like);
