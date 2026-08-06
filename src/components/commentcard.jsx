import { useState } from "react";
import style from "./commentcard.module.css";
import { timeAgo } from "@/utils/time";

function Commentcard({ id, title, author, date, noticeId, onUpdated, onDeleted }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(title);

  async function handleDelete() {
    const res = await fetch(`/api/notice/${noticeId}/comment?commentId=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("댓글이 삭제되었습니다.");
      if (onDeleted) onDeleted(id);
    }
  }

  async function handleSave() {
    const res = await fetch(`/api/notice/${noticeId}/comment?commentId=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    if (res.ok) {
      alert("댓글이 수정되었습니다.");
      setIsEditing(false);
      setIsDropdownOpen(false);
      if (onUpdated) onUpdated(id, editContent);
    }
  }

  return (
    <div className={style.commentcard_wrap}>
      <div className={style.frame}>
        <div className={style.content_wrap}>
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <span>{title}</span>
          )}

          {/* 수정 모드가 아닐 때만 kebob 아이콘 표시 */}
          {!isEditing && (
            <img
              src="/assets/ic_kebab.svg"
              alt="kebob"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ cursor: "pointer" }}
            />
          )}

          {isDropdownOpen && !isEditing && (
            <ul className={style.dropdown}>
              <li onClick={() => setIsEditing(true)}>수정</li>
              <li onClick={handleDelete}>삭제</li>
            </ul>
          )}
        </div>
        <div className={style.explane_wrap}>
          <div className={style.namelike_wrap}>
            <img src="/assets/ic_profile.svg" alt="profile" />
            <div className={style.namedate}>
              <span id={style.author}>{author}</span>
              <span id={style.date}>{timeAgo(date)}</span>
            </div>
          </div>
          {isEditing && (
              <div className={style.edit_buttons}>
                <div className={style.cancle}>
                  <span
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(title); // 원래 내용 복원
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    취소
                  </span>
                </div>
                <button className={style.permit} onClick={handleSave}><span>수정 완료</span></button>
              </div>
            )}
        </div>
      </div>
      <svg width="100%" height="1">
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#E5E7EB" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default Commentcard;
