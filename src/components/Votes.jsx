import { updateVotesByArticle, updateVotesByComment } from "../../apis";
import { useState } from "react";

function Votes({ setItem, item, type }) {
  const [voted, setVoted] = useState({ upVote: false, downVote: false });
  let handleClick = "";

  if (type === "articles") {
    handleClick = (voteChange, direction) => {
      const optimisticArticle = {
        ...item,
        votes: item.votes + voteChange,
      };
      setVoted({ ...voted, [direction]: !voted[direction] });
      setItem(optimisticArticle);
      updateVotesByArticle(item.article_id, voteChange)
        .then((updatedArticle) => {
          setItem(updatedArticle);
        })
        .catch(() => {
          setVoted({ ...voted });
          setItem({ ...item });
        });
    };
  }

  if (type === "comments") {
    handleClick = (voteChange, direction) => {
      const optimisticComment = {
        ...item,
        votes: item.votes + voteChange,
      };
      setVoted({ ...voted, [direction]: !voted[direction] });
      setItem(optimisticComment);
      updateVotesByComment(item.comment_id, voteChange)
        .then((updatedComment) => {
          setItem(updatedComment);
        })
        .catch(() => {
          setVoted({ ...voted });
          setItem({ ...item });
        });
    };
  }

  return (
    <div className="votes">
      <button
        className={voted.downVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.downVote ? +1 : -1, "downVote");
        }}
      >
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/thumbs-down.png"
          alt="thumbs-down"
        />
      </button>
      <p className="inline-block">{item.votes} votes</p>
      <button
        className={voted.upVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.upVote ? -1 : 1, "upVote");
        }}
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChUlEQVR4nO2ZTYhOURjHf0MThqF3ehuNogwLRA0Ln6kxaykLspiVBQsKS8LOQiiKwmIUC6uxoCzMjJSFpKZMYaYxChn5DEO+BtOp/1untzv3feuee95zdX91Nvec/s/z3HvPOc95DuTk5NSCGcBp4D0wCpwHCmSMqcAt4F9ZGwaayBDH5PgroA1YCjzUs5NkhA7gD/AbWGs936BARsgARX0F4/Chsr5Zev6dwKkDbsjZPmBKWX+b+oYInH1y9C0wL6L/lPrPEjArgR/AX2BzRH8D8EGBrCJQZgJP5KTZN6LYpf67BMwlOTkATJ9kTGnp3U6gbJODX4Elk4xpt/aUegKkFfgsJ3fGjOvWmMMESD1wXw5ejRm3EBjX3tFMgBxXEM8rJIJnNO4iAdJupSDrYsbN1q9nluRlBEYz8Fpv+WCVG2RUM4vDx5g2CtxTmmNSG+cpyE050huRgpTTCfyKCaba9hiY6zKQPVYK0pJwAy1UaPOBLcAj2bziKghzGPok0a34Y7FsmrnmhAMS7MEvBWtOOaFHgmYn98kK2R10JfhGglHpeZpstL7IbheC4xI0RQWfTAPOWfYTJ52lpbBW7JX9B1kPpMnVpK91IGtk/2WWAykC/bJvktDMBjIg289clFxrGch12f5ZIdsOPpA64ITs3876ZC/+L6vWctl/kVToi4Qa8c8Ca8J3JRUblJCp3/qkE/hmrVqJc70LEjuCX7pkt99VFabDOh2aooIvVsuuKck6o0+i3VWc113RkMadyiJdbBrha8Ac/JVkn7oWXm8F8w44qmsC1yWbFh2kSiXZ/aRU8+11UOaptl1O+1fepLtzU3cac+z8GHAH2JFmADk5OWSTCQIHBIvH/7mJAAAAAElFTkSuQmCC"
          alt="thumbs-up"
          width="25"
          height="25"
        />
      </button>
    </div>
  );
}

export default Votes;
