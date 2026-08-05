import { Link } from 'react-router-dom';
import {
  DEFAULT_ARTICLE_IMAGE,
  formatDate,
  getLikeCount,
  getNickname,
} from '../utils/articleDisplay.js';

function BestArticleCard({ article }) {
  return (
    <Link className="bestArticleCard" to={`/board/${article.id}`}>
      <span className="bestBadge">🏅 Best</span>

      <div className="bestArticleBody">
        <p className="bestArticleTitle">{article.title}</p>
        <img className="bestArticleImage" src={DEFAULT_ARTICLE_IMAGE} alt="" />
      </div>

      <div className="bestArticleMeta">
        <span className="articleNickname">{getNickname(article.id)}</span>
        <span className="articleLike">♡ {getLikeCount(article.id)}</span>
        <span className="articleDate">{formatDate(article.createdAt)}</span>
      </div>
    </Link>
  );
}

export default BestArticleCard;
