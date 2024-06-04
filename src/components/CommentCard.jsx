import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteComment } from "../../apis";
import { getCommentsByArticle } from "../../apis";
import Loading from "./Loading";
import Error from "./Error";
import Votes from "./Votes";

function CommentCard({ comment, setComments, article, setArticle }) {
  const user = useContext(UserContext);
  const [deleteButtonAvailable, setDeleteButtonAvailable] =
    useState("buttonDesign");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [singleComment, setSingleComment] = useState(comment);

  useEffect(() => {
    singleComment.author === user
      ? setDeleteButtonAvailable("buttonDesign")
      : setDeleteButtonAvailable("hiddenButton");
  }, []);

  const handleDeleteOnClick = (event) => {
    event.preventDefault();
    setLoading(true);
    deleteComment(singleComment.comment_id)
      .then(() => {
        return getCommentsByArticle(singleComment.article_id);
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

  const { created_at, author, body } = singleComment;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <li className="comment-card">
      <p>{body}</p>
      <div className="grid-comments">
        <p> {author}</p>
        <Votes
          item={singleComment}
          setItem={setSingleComment}
          type={"comments"}
        />
        <p>{created_at}</p>
        <button className={deleteButtonAvailable} onClick={handleDeleteOnClick}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default CommentCard;
