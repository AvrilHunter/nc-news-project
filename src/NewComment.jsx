import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { postCommentByArticle } from "../apis";
import Error from "./styleFunctionComponents/Error";

function NewComment({ article_id, setComments, comments }) {
  const user = useContext(UserContext);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCommentValid, setValidComment] = useState(true);
  const [newComment, setNewComment] = useState({
    username: user,
    body: "",
  });


  useEffect(() => {
    newComment.body === "" ? setButtonDisabled(true) : setButtonDisabled(false);
  },[newComment]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!buttonDisabled) {
      postCommentByArticle(newComment, article_id)
        .then((newComment) => {
          setComments([newComment, ...comments]);
          setNewComment({
            username: user,
            body: "",
          });
        })
        .catch((err) => {
          setErrMsg(err.response.data.message);
          setErrStatus(err.response.status);
          setError(true);
        });
    }
  };

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }


  if (!isCommentValid) {
    return (
      <div className="add-comment-form">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label htmlFor="comment">
            <strong>Add a comment</strong>{" "}
          </label>
          <input
            id="comment"
            className={isCommentValid ? "comment-valid" : "comment-invalid"}
            type="text"
            placeholder="Your comment here...."
            value={newComment.body}
            onChange={(e) => {
              setNewComment({ username: user, body: e.target.value });
              e.target.value === ""
                ? setValidComment(false)
                : setValidComment(true);
            }}
            ></input>
            <p>Please add a comment to post!</p>
          <button className="buttonDesign" type="submit" disabled={buttonDisabled}>
            Post
          </button>
        </form>
      </div>
    );
  }


  return (
    <div className="add-comment-form">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="comment">
          <strong>Add a comment</strong>{" "}
        </label>
        <input
          id="comment"
          className={isCommentValid ? "comment-valid" : "comment-invalid"}
          type="text"
          placeholder="Your comment here...."
          value={newComment.body}
          onChange={(e) => {
            setNewComment({ username: user, body: e.target.value });
             e.target.value === ""
               ? setValidComment(false)
               : setValidComment(true);
          }}
        ></input>
        <button
          className="buttonDesign"
          type="submit"
          disabled={buttonDisabled}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default NewComment;
