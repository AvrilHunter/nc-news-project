import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../apis";
import Comments from "./Comments";
import Votes from "./Votes";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";


function SingleArticle() {
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("")
   const [errStatus, setErrStatus] = useState("");

    useEffect(() => {
      getArticleById(article_id)
        .then((article) => {
          setArticle(article);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false)
          setErrMsg(err.response.data.message)
          setErrStatus(err.response.status);
          setError(true)
        });
    }, [])

    const {author, title, article_img_url, comment_count, votes, body, topic, created_at} = article

    if (loading) {
      return <Loading />;
    }
  
  if (error) { return <Error errMsg={errMsg} errStatus={errStatus} />}
  
    return (
      <div className="singlePage">
        <img className="articleImageSingle" src={article_img_url} alt={title} />
        <h2 className="title">{title}</h2>
        <p className="body">{body}</p>
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        {
          <Votes
            className="votes"
            setArticle={setArticle}
            article = {article}
            />
        }
        <p className="date">Date posted: {created_at}</p>
        <p className="comment_count">Comments: {comment_count}</p>
        <Comments article={article} setArticle={setArticle} />
      </div>
    );
}

export default SingleArticle;
