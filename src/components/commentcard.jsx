import { useState } from "react";
import style from "./commentcard.module.css";
import { timeAgo } from "@/utils/time";
import api from "@/utils/api"; // axios 인스턴스
import { toast } from "react-toastify";

function Commentcard({ id, title, author, date, type, parentId, onUpdated, onDeleted }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(title);

  // 삭제
  async function handleDelete() {
    try {
      await api.delete(`/${type}/${parentId}/comment`, {
        params: { commentId: id },
      });
      toast("댓글이 삭제되었습니다.");
      if (onDeleted) onDeleted(id); // 부모 캐시 갱신
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("권한이 없습니다. 본인 댓글만 삭제할 수 있습니다.");
      } else if (err.response?.status === 400) {
        toast.error("잘못된 요청입니다.");
      } else if (err.response?.status === 500) {
        toast.error("서버 오류가 발생했습니다.");
      } else {
        toast.error("댓글 수정 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  // 수정
  async function handleSave() {
    try {
      await api.patch(
        `/${type}/${parentId}/comment`,
        { content: editContent },
        { params: { commentId: id } }
      );
      toast("댓글이 수정되었습니다.");
      setIsEditing(false);
      setIsDropdownOpen(false);
      if (onUpdated) onUpdated(id, editContent); // 부모 캐시 갱신
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("권한이 없습니다. 본인 댓글만 수정할 수 있습니다.");
      } else if (err.response?.status === 400) {
        toast.error("잘못된 요청입니다.");
      } else if (err.response?.status === 500) {
        toast.error("서버 오류가 발생했습니다.");
      } else {
        toast.error("댓글 수정 중 알 수 없는 오류가 발생했습니다.");
      }
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
                    setEditContent(title);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  취소
                </span>
              </div>
              <button className={style.permit} onClick={handleSave}>
                <span>수정 완료</span>
              </button>
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
