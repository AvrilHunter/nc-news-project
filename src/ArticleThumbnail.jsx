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
    comment_count,
  } = article;
  return (
    <li className="no-bullet-point">
      <Link to={`/articles/${article_id}`} className="articleThumbnail">
        <img className="articleImage" src={article_img_url} alt="" />
        <h2 className="title">{title}</h2>
        <p className="no-margin bold"> {author}</p>
        <p className="no-margin bold"> {topic}</p>
        <p className="no-margin">Comments: {comment_count}</p>
        <p className="no-margin">Votes: {votes}</p>
        <p className="no-margin" id="thumbnail-date">
          Date posted: {created_at}
        </p>
      </Link>
    </li>
  );
}

export default ArticleThumbnail;
