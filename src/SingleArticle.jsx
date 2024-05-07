import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../apis";
import Loading from "./Loading";
import formatDate from "./utils/utils";


function SingleArticle() {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
      getArticleById(article_id)
        .then((article) => {
          setArticle(article);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])

    const {author, title, article_img_url, comment_count, votes, body, topic, created_at} = article

    if (loading) {
      return <Loading />;
    }
  
    return (
      <>
        <img className="articleImage" src={article_img_url} alt={title} />
        <h2 className="title">{title}</h2>
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        <p className="body">{body}</p>
        <p className="votes">Votes: {votes}</p>
        <p className="comment_count">Comments: {comment_count}</p>
        <p className="date">Date posted: {formatDate(created_at)}</p>
      </>
    );
}

export default SingleArticle;
