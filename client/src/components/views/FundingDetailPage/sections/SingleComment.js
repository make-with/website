import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../../url/url';
import { withRouter } from 'react-router-dom';

function SingleComment(props) {
  const [Reply, setReply] = useState('');
  const [ReplyOpen, setReplyOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');

  const onReplyHandler = (event) => {
    setReply(event.currentTarget.value);
  };
  const replyOpenHandler = (event) => {
    event.preventDefault();
    setReplyOpen(!ReplyOpen);
  };
  const onSubmitHandler2 = (event) => {
    event.preventDefault();

    let body = {
      fundingId: props.fundingId,
      writer: userId,
      replyTo: props.comment._id,
      content: Reply,
    };

    if (userId) {
      axios.post('/api/funding/comment/savecomment', body).then((response) => {
        if (response.data.success) {
          setReply('');
          setReplyOpen(false);
          props.update(response.data.result);
        } else {
          alert('댓글 입력에 실패했습니다.');
        }
      });
    } else {
      props.history.push('/login');
    }
  };

  return (
    <div>
      <form>
        <button type="submit" onClick={replyOpenHandler}>
          답글
        </button>
      </form>
      {ReplyOpen && (
        <div className="comment-input">
          {user.userData?.image ? (
            <img src={`${API_URL}/${user.userData?.image}`} alt="profile" />
          ) : (
            <img src="/images/profile.png" alt="profile" />
          )}
          <form onSubmit={onSubmitHandler2}>
            <textarea
              value={Reply}
              onChange={onReplyHandler}
              wrap="physical"
              placeholder="악성댓글은 관리자에 의해 삭제될 수 있습니다."
            />
            <button className="reply-submit" type="submit">
              작성
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default withRouter(SingleComment);
