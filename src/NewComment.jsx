import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { postCommentByArticle } from "../apis";
import Error from "./styleFunctionComponents/Error";

function NewComment({ article_id, setComments, comments }) {
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");

  const user = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: user,
    body: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonDisabled(true);
    if (newComment.body !== "") {
      postCommentByArticle(newComment, article_id)
        .then((newComment) => {
          setComments([newComment, ...comments]);
          setNewComment({
            username: user,
            body: "",
          });
          setButtonDisabled(false);
        })
        .catch((err) => {
          setErrMsg(err.response.data.message);
          setErrStatus(err.response.status);
          setError(true);
        });
    } else {
      setButtonDisabled(false);
    }
  };

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label htmlFor="comment">Add a comment: </label>
      <input
        id="comment"
        type="text"
        placeholder="Your comment here...."
        value={newComment.body}
        onChange={(e) => {
          setNewComment({ username: user, body: e.target.value });
        }}
      ></input>
      <button className="buttonDesign" type="submit" disabled={buttonDisabled}>
        Post
      </button>
    </form>
  );
}

export default NewComment;
