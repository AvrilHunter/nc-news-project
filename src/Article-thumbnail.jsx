import { Link } from "react-router-dom";
import  formatDate  from "./utils/utils"

function ArticleThumbnail({ article }) {
  const { author, title, topic, votes, article_img_url , created_at, article_id} = article
  return (
    <li className="articleThumbnail">
      <Link to={`/articles/${article_id}`} className="articleThumbnail">
        <img className="articleImage" src={article_img_url} alt={title} />
        <h2 className="title">{title}</h2>
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        <p className="votes">Votes: {votes}</p>
        <p className="date">Date posted: {formatDate(created_at)}</p>
      </Link>
    </li>
  );
}

export default ArticleThumbnail;
