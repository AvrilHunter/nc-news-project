import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteComment } from "../../apis";
import { getCommentsByArticle } from "../../apis";
import Loading from "./Loading";

function CommentCard({ comment, setComments, article, setArticle }) {
  const user = useContext(UserContext);
  const [deleteButtonAvailable, setDeleteButtonAvailable] =
    useState("buttonDesign");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");

  useEffect(() => {
    comment.author === user
      ? setDeleteButtonAvailable("buttonDesign")
      : setDeleteButtonAvailable("hiddenButton");
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setLoading(true);
    deleteComment(comment.comment_id)
      .then(() => {
        return getCommentsByArticle(comment.article_id);
      })
      .then((comments) => {
        setComments(comments);
        const newArticle = {
          ...article,
          comment_count: article.comment_count - 1,
        };
        setArticle(newArticle);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
      });
  };

  const { votes, created_at, author, body } = comment;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <li className="comment-card">
      <p>{body}</p>
      <strong className="flex-comments">
        <p> {author}</p>
        <p>{votes} votes</p>
        <p>{created_at}</p>
        <button className={deleteButtonAvailable} onClick={handleClick}>
          Delete
        </button>
      </strong>
    </li>
  );
}

export default CommentCard;
