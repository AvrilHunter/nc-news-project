import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../apis";
import Loading from "./Loading";
import Comments from "./Comments";
import Error from "./Error";


function SingleArticle() {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   

    useEffect(() => {
      getArticleById(article_id)
        .then((article) => {
          setArticle(article);
          setLoading(false);
        })
        .catch((err) => {
          setError({err})
        });
    }, [])

    const {author, title, article_img_url, comment_count, votes, body, topic, created_at} = article

    if (loading) {
      return <Loading />;
    }
  
  if(error){return <Error/>}
  
    return (
      <div className="singlePage">
        <img className="articleImageSingle" src={article_img_url} alt={title} />
        <h2 className="title">{title}</h2>
        <p className="body">{body}</p>
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        <p className="votes">Votes: {votes}</p>
        <p className="date">Date posted: {created_at}</p>
        <p className="comment_count">Comments: {comment_count}</p>
        <Comments article_id={article_id} />
      </div>
    );
}

export default SingleArticle;
