import Image from 'next/image';
import formatDate from '@/utils/formatDate';
import ArticleMenu from '@/components/EditDeleteMenu';
import CommentForm from '@/components/form/CommentForm';
import profileIcon from '@/assets/ic_profile.png';
import heartIcon from '@/assets/ic_heart.png';
import styles from './page.module.css';
import CommentList from '@/components/comment/CommentList';
import BackLink from '@/components/BackLink';

export default async function ArticleDetail({ params }) {
  const { id } = await params;

  const articleRes = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, 
    { cache: 'no-store'}
  )
  const commentRes = await fetch(`${process.env.API_BASE_URL}/articles/${id}/comments`,
    { cache: 'no-store'}
  )

  if (!articleRes.ok) {
    throw new Error('게시글을 불러오는 데 실패했습니다');
  }
  if (!commentRes.ok) {
    throw new Error('댓글을 불러오는 데 실패했습니다');
  }

  const article = await articleRes.json();
  const comments = await commentRes.json();

  return (
    <div className={styles.wrapper}>
      <section className={styles.articleSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {article.title}
          </h1>
          <ArticleMenu articleId={article.id}/>
        </div>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <Image
              src={profileIcon}
              width={40}
              height={40}
              loading='eager'
              alt='프로필 아이콘'
            />
            <p className={styles.nickname}>
              {article.nickname || '총명한 판다'}
            </p>
            <p className={styles.date}>
              {formatDate(article.createdAt)}
            </p>
          </div>
          <div className={styles.heart}>
            <Image
              src={heartIcon}
              width={26}
              height={23}
              loading='eager'
              alt='좋아요 수'
            />
            <p className={styles.heartCount}>
              {article.fav || 0}
            </p>
          </div>
        </div>
        <p className={styles.content}>
          {article.content}
        </p>
      </section>

      <section className={styles.commentFormSection}>
        <CommentForm />
      </section>

      <section className={styles.commentListSection}>
        <CommentList comments={comments} />
        <div className={styles.backLink}>
          <BackLink />
        </div>
      </section>
    </div>
  )
}