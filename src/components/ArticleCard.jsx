import { Link } from 'react-router-dom';
import {
  DEFAULT_ARTICLE_IMAGE,
  formatDate,
  getLikeCount,
  getNickname,
} from '../utils/articleDisplay.js';

function ArticleCard({ article }) {
  return (
    <Link className="articleCard" to={`/board/${article.id}`}>
      <div className="articleCardTop">
        <p className="articleTitle">{article.title}</p>
        <img className="articleImage" src={DEFAULT_ARTICLE_IMAGE} alt="" />
      </div>

      <div className="articleCardBottom">
        <div className="articleWriter">
          <span className="articleAvatar" aria-hidden="true" />
          <span className="articleNickname">{getNickname(article.id)}</span>
          <span className="articleDate">{formatDate(article.createdAt)}</span>
        </div>
        <span className="articleLike">♡ {getLikeCount(article.id)}</span>
      </div>
    </Link>
  );
}

export default ArticleCard;
