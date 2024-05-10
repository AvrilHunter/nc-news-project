import { updateVotesByArticle } from "../apis";
import { useState } from "react";
import Error from "./styleFunctionComponents/Error";
import useVotes from "./hooks/useVotes";

function Votes({ setArticle, article }) {

  // const testVotes = useVotes()
  // console.log(testVotes, "here in votes comp");

  const [error, setError] = useState(null);
  const [voted, setVoted] = useState({ upVote: false, downVote: false });
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");

  const { votes } = article;

  const handleClick = (votes, direction) => {
    const optimisticArticle = {
      ...article,
      votes: article.votes + votes,
    };
    setArticle(optimisticArticle);
    updateVotesByArticle(article.article_id, votes)
      .then((updatedArticle) => {
        const newArticle = { ...article, votes: updatedArticle.votes };
        setArticle(newArticle);
        setVoted({ ...voted, [direction]: !voted[direction] });
      })
      .catch((err) => {
        setArticle(article);
        setVoted({ ...voted, [direction]: !voted[direction] });
        setError(true);
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
      });
  };

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <div className="votes">
      <button
        className={voted.upVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.upVote ? +1 : -1, "upVote");
        }}
      >
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/50/thumbs-down.png"
          alt="thumbs-down"
        />
      </button>
      <p className="inline-block">Votes: {votes}</p>
      <button
        className={voted.downVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.downVote ? -1 : 1, "downVote");
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChUlEQVR4nO2ZTYhOURjHf0MThqF3ehuNogwLRA0Ln6kxaykLspiVBQsKS8LOQiiKwmIUC6uxoCzMjJSFpKZMYaYxChn5DEO+BtOp/1untzv3feuee95zdX91Nvec/s/z3HvPOc95DuTk5NSCGcBp4D0wCpwHCmSMqcAt4F9ZGwaayBDH5PgroA1YCjzUs5NkhA7gD/AbWGs936BARsgARX0F4/Chsr5Zev6dwKkDbsjZPmBKWX+b+oYInH1y9C0wL6L/lPrPEjArgR/AX2BzRH8D8EGBrCJQZgJP5KTZN6LYpf67BMwlOTkATJ9kTGnp3U6gbJODX4Elk4xpt/aUegKkFfgsJ3fGjOvWmMMESD1wXw5ejRm3EBjX3tFMgBxXEM8rJIJnNO4iAdJupSDrYsbN1q9nluRlBEYz8Fpv+WCVG2RUM4vDx5g2CtxTmmNSG+cpyE050huRgpTTCfyKCaba9hiY6zKQPVYK0pJwAy1UaPOBLcAj2bziKghzGPok0a34Y7FsmrnmhAMS7MEvBWtOOaFHgmYn98kK2R10JfhGglHpeZpstL7IbheC4xI0RQWfTAPOWfYTJ52lpbBW7JX9B1kPpMnVpK91IGtk/2WWAykC/bJvktDMBjIg289clFxrGch12f5ZIdsOPpA64ITs3876ZC/+L6vWctl/kVToi4Qa8c8Ca8J3JRUblJCp3/qkE/hmrVqJc70LEjuCX7pkt99VFabDOh2aooIvVsuuKck6o0+i3VWc113RkMadyiJdbBrha8Ac/JVkn7oWXm8F8w44qmsC1yWbFh2kSiXZ/aRU8+11UOaptl1O+1fepLtzU3cac+z8GHAH2JFmADk5OWSTCQIHBIvH/7mJAAAAAElFTkSuQmCC"></img>
      </button>
    </div>
  );
}

export default Votes;
