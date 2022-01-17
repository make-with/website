import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SingleComment from './SingleComment';
import Reply from './Reply';
import { API_URL } from '../../../../url/url';
import { withRouter } from 'react-router-dom';

function Comment(props) {
  const [Comment, setComment] = useState('');
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('userId');

  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      fundingId: props.fundingId,
      writer: userId,
      content: Comment,
    };

    if (userId) {
      axios.post('/api/funding/comment/savecomment', body).then((response) => {
        if (response.data.success) {
          setComment('');
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
    <div className="comment-wrap">
      <span>댓글 {props.commentNumber}개</span>
      <div className="comment-input">
        {user.userData?.image ? (
          <img src={`${API_URL}/${user.userData?.image}`} alt="profile" />
        ) : (
          <img src="/images/profile.png" alt="profile" />
        )}
        <form onSubmit={onSubmitHandler}>
          <textarea
            value={Comment}
            onChange={onCommentHandler}
            wrap="physical"
            placeholder="악성댓글은 관리자에 의해 삭제될 수 있습니다."
          />
          <button type="submit">작성</button>
        </form>
      </div>
      {props.comments &&
        props.comments.map(
          (comment, index) =>
            !comment.replyTo && (
              <div className="single-comment" key={index}>
                {comment.writer?.image ? (
                  <img
                    src={`${API_URL}/${comment.writer?.image}`}
                    alt="profile"
                  />
                ) : (
                  <img src="/images/profile.png" alt="profile" />
                )}
                <div className="comment-box">
                  <div className="comment-info">
                    <span>{comment.writer?.id}</span>
                    <p>{comment.content}</p>
                    <div className="reply-btn">
                      <SingleComment
                        comment={comment}
                        fundingId={props.fundingId}
                        update={props.update}
                      />
                      <Reply
                        comments={props.comments}
                        fundingId={props.fundingId}
                        parentCommentId={comment._id}
                        update={props.update}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
    </div>
  );
}

export default withRouter(Comment);
