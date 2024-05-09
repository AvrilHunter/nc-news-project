import { useEffect } from "react";
import { getCommentsByArticle } from "../apis";
import Loading from "./styleFunctionComponents/Loading";
import { useState } from "react";
import CommentCard from "./CommentCard";
import Expandable from "./styleFunctionComponents/Expandable";
import NewComment from "./NewComment";

function Comments({ article, setArticle }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [errStatus, setErrStatus] = useState("");


  useEffect(() => {
    getCommentsByArticle(article.article_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
         setError(true);
         setErrMsg(err.response.data.message);
         setErrStatus(err.response.status);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }


  return (
    <Expandable>
      <NewComment
        article_id={article.article_id}
        setComments={setComments}
        comments={comments}
      />
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
    </Expandable>
  );
}

export default Comments;
