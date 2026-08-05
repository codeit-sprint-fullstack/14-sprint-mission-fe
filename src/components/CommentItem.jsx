import { useState } from 'react';
import KebabMenu from './KebabMenu';
import { formatRelativeTime, getNickname } from '../utils/articleDisplay.js';

/**
 * 댓글 한 건. 수정 모드로 전환하면 같은 자리에서 인라인 편집한다.
 */
function CommentItem({ comment, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [submitting, setSubmitting] = useState(false);

  const startEdit = () => {
    setDraft(comment.content);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(comment.content);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (draft.trim() === '' || submitting) return;

    setSubmitting(true);
    try {
      await onUpdate(comment.id, draft.trim());
      setIsEditing(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className="commentItem">
      {isEditing ? (
        <>
          <textarea
            className="commentEditInput"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="commentEditActions">
            <button className="commentCancelBtn" onClick={cancelEdit}>취소</button>
            <button
              className="commentSubmitBtn"
              disabled={draft.trim() === '' || submitting}
              onClick={handleSave}
            >
              수정 완료
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="commentItemTop">
            <p className="commentContent">{comment.content}</p>
            <KebabMenu onEdit={startEdit} onDelete={() => onDelete(comment.id)} />
          </div>

          <div className="commentWriter">
            <span className="articleAvatar" aria-hidden="true" />
            <div className="commentWriterInfo">
              <span className="articleNickname">{getNickname(comment.id)}</span>
              <span className="articleDate">{formatRelativeTime(comment.createdAt)}</span>
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default CommentItem;
