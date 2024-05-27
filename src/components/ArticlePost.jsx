import Error from "./Error";
import Loading from "./Loading";
import useTopics from "../hooks/useTopics";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { postArticle } from "../../apis";
import ArticleThumbnail from "./ArticleThumbnail";

function ArticlePost() {
  const user = useContext(UserContext);
  const [allTopics, loading] = useTopics(); //didn't bring in this error messaging.
  const [newArticle, setNewArticle] = useState({
    author: user,
    topic: "",
    body: "",
    title: "",
  });

  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [postedArticle, setPostedArticle] = useState(null);
  const [validTitleInput, setValidTitleInput] = useState(true);
  const [validBodyInput, setValidBodyInput] = useState(true);
  const [validInput, setValidInput] = useState(false);

  const onTitleChange = (event) => {
    event.target.value === ""
      ? setValidTitleInput(false)
      : setValidTitleInput(true);
    setNewArticle({ ...newArticle, title: event.target.value });
  };

  const onBodyChange = (event) => {
    event.target.value === ""
      ? setValidBodyInput(false)
      : setValidBodyInput(true);
    setNewArticle({ ...newArticle, body: event.target.value });
  };

  const onTopicChange = (event) => {
    setNewArticle({ ...newArticle, topic: event.target.value });
  };

  useEffect(() => {
    newArticle.title !== "" && newArticle.body !== ""
      ? setValidInput(true)
      : setValidInput(false);
  }, [newArticle]);

  const handleSubmit = (event) => {
    event.preventDefault();
    postArticle(newArticle)
      .then((article) => {
        setPostedArticle(article);
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
        setError(true);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <>
      <p>User: {user}</p>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={validTitleInput ? "input-valid" : "input-invalid"}
          onChange={onTitleChange}
          placeholder="Title of your article..."
        />
        <label htmlFor="body">Content</label>
        <input
          type="text"
          id="body"
          name="body"
          className={validBodyInput ? "input-valid" : "input-invalid"}
          onChange={onBodyChange}
          placeholder="Article..."
        />
        <label htmlFor="select-topic">Topic:</label>
        <select
          id="select-topic"
          name="topics"
          title="select-topic"
          onChange={onTopicChange}
        >
          {allTopics.map((topic) => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </option>
            );
          })}
        </select>
        <button className="buttonDesign" disabled={!validInput}>
          Post Article
        </button>
      </form>
      {postedArticle && <ArticleThumbnail article={postedArticle} />}
    </>
  );
}

export default ArticlePost;
