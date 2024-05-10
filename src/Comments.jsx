import { useEffect } from "react";
import { getCommentsByArticle } from "../apis";
import Loading from "./styleFunctionComponents/Loading";
import { useState } from "react";
import CommentCard from "./CommentCard";
import Expandable from "./styleFunctionComponents/Expandable";
import NewComment from "./NewComment";
import LoadMore from "./LoadMore";
import { useSearchParams } from "react-router-dom";
import useLoading from "./hooks/useLoading";


function Comments({ article, setArticle }) {

  const [loading, loadingWrapper] = useLoading()

  const [comments, setComments] = useState([]);
 // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams();
  const totalCount = article.comment_count

  let params = new URLSearchParams(searchParams);
  const p = searchParams.get("p")

  useEffect(() => {
    
    loadingWrapper(() => {
      return getCommentsByArticle(article.article_id, params)
        .then((comments) => {
          setComments(comments);
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.response.data.message);
          setErrStatus(err.response.status);
        });
    })
  }, [p]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <section> 
      <NewComment
        article_id={article.article_id}
        setComments={setComments}
        comments={comments}
      />
      <Expandable>
        <ul className="comments-section">
          {comments.map((comment) => {
            return (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setComments={setComments}
                article={article}
                setArticle={setArticle}
              />
            );
          })}
        </ul>
        <LoadMore page={page} setPage={setPage} totalCount={totalCount} />
      </Expandable>
    </section>
  );
}

export default Comments;
