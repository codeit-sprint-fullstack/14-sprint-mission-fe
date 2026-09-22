"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import ArticleCommentItem from "../ArticleCommentItem/ArticleCommentItem";

export default function ArticleCommentList({ comments }) {
  const { data: currentUser } = useCurrentUser();

  return comments.map((comment) => (
    <ArticleCommentItem
      key={comment.id}
      comment={comment}
      currentUserId={currentUser?.id}
    />
  ));
}
