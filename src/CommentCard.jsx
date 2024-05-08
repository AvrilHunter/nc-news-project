import { useContext , useEffect, useState} from "react";
import { UserContext } from "../context/UserContext";
import { deleteComment } from "../apis"
import { getCommentsByArticle } from "../apis";
import Loading from "./Loading";

function CommentCard({ comment, setComments, article, setArticle }) {
  const user = useContext(UserContext);
  const [deleteButtonAvailable, setDeleteButtonAvailable] =
    useState("buttonDesign");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const newArticle = { ...article, comment_count: article.comment_count - 1 }
        setArticle(newArticle)
        setLoading(false);
      })
      .catch((err) => {
        setError({ err });
        }) 
  };

  const { votes, created_at, author, body } = comment;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
    
  return (
    <section className="comment-card">
      <p>{body}</p>
      <p>Author: {author}</p>
      <p>Votes: {votes}</p>
      <p>Date posted: {created_at}</p>
      <button className={deleteButtonAvailable} onClick={handleClick}>
        Delete Comment
      </button>
    </section>
  );
}

export default CommentCard;
