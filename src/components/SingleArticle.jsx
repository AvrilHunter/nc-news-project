import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../apis";
import Comments from "./Comments";
import Votes from "./Votes";
import Loading from "./Loading";
import Error from "./Error";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  const [loading, loadingWrapper] = useLoading();
  const [errorWrapper, error, errMsg, errStatus] = useError();

  useEffect(() => {
    loadingWrapper(() => {
      return errorWrapper(() => {
        return getArticleById(article_id).then((article) => {
          setArticle(article);
        });
      });
    });
  }, []);

  const {
    author,
    title,
    article_img_url,
    comment_count,
    body,
    topic,
    created_at,
  } = article;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <article className="single-page">
      <img className="articleImageSingle" src={article_img_url} alt="" />
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <div className="single-article">
        <p className="author">Author: {author}</p>
        <p className="topic"> Topic: {topic}</p>
        <p className="date">Date posted: {created_at}</p>
        <p className="comment_count">{comment_count} comments</p>
        <div className="span-two-columns">
          <Votes setItem={setArticle} item={article} type={"articles"} />
        </div>
      </div>
      <Comments article={article} setArticle={setArticle} />
    </article>
  );
}

export default SingleArticle;
