import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../../url/url';

function Reply(props) {
  const [ReplyView, setReplyView] = useState(false);
  const [ReplyNumber, setReplyNumber] = useState(0);

  useEffect(() => {
    let replyNumber = 0;
    //eslint-disable-next-line
    props.comments.map((comment) => {
      if (comment.replyTo === props.parentCommentId) {
        replyNumber++;
      }
    });
    setReplyNumber(replyNumber);
    //eslint-disable-next-line
  }, [props.comments, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.comments.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.replyTo === parentCommentId && (
          <div
            className="single-comment"
            key={index}
            style={{ marginLeft: '20px' }}
          >
            {comment.writer?.image ? (
              <img src={`${API_URL}/${comment.writer?.image}`} alt="profile" />
            ) : (
              <img src="/images/profile.png" alt="profile" />
            )}
            <div className="comment-box">
              <div className="comment-info">
                <span>{comment.writer?.id}</span>
                <p>{comment.content}</p>
                {/* <div className="reply-btn">
                  <SingleComment comment={comment} fundingId={props.fundingId} update={props.update} />
                  <Reply comments={props.comments} parentCommentId={comment._id} fundingId={props.fundingId} update={props.update} />
                </div> */}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    ));

  const replyViewHandler = (event) => {
    event.preventDefault();
    setReplyView(!ReplyView);
  };

  return (
    <div>
      {ReplyNumber > 0 && (
        <button onClick={replyViewHandler}>
          <div className="material-icons">expand_more</div>
          답글 {ReplyNumber}개 {ReplyView ? '숨기기' : '보기'}
        </button>
      )}
      {ReplyView && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default Reply;
