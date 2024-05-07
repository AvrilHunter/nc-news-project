import { Link } from "react-router-dom";

function ArticleThumbnail({ article }) {
  const {
    author,
    title,
    topic,
    votes,
    article_img_url,
    created_at,
    article_id,
  } = article;
  return (
    <Link to={`/articles/${article_id}`}>
      <li className="articleThumbnail">
        <img className="articleImage" src={article_img_url} alt={title} />
        <h2 className="title">{title}</h2>
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        <p className="votes">Votes: {votes}</p>
        <p className="date">Date posted: {created_at}</p>
      </li>
    </Link>
  );
}

export default ArticleThumbnail;
