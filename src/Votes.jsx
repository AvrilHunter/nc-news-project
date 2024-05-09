import { updateVotesByArticle } from "../apis";
import { useState } from "react";
import Error from "./styleFunctionComponents/Error";

function Votes({ votes, setArticle, article_id, article }) {

    const [error, setError] = useState(null);
    const [voted, setVoted] = useState({ upVote: false, downVote: false })

    const handleClick = (votes, direction) => {
        const optimisticArticle = {
          ...article,
          votes: article.votes+votes,
        };
        setArticle(optimisticArticle)
        updateVotesByArticle(article_id, votes)
          .then((updatedArticle) => {
            const newArticle = { ...article, votes: updatedArticle.votes };
              setArticle(newArticle);
              setVoted( {...voted, [direction]:!voted[direction]})
          })
          .catch((err) => {
            setArticle(article); 
            setVoted({ ...voted, [direction]: !voted[direction] });
            setError({ err });
          });
    };
  
    
    if (error) {
      return <Error />;
    }
  
  return (
    <>
      <button
        className={voted.upVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.upVote ? -1 : +1, "upVote");
        }}
      >
        Up Vote
      </button>
      <p className="inline-block">Votes: {votes}</p>
      <button
        className={voted.downVote ? "buttonUsed" : "buttonDesign"}
        onClick={() => {
          handleClick(voted.downVote ? 1 : -1, "downVote");
        }}
      >
        Down Vote
      </button>
    </>
  );
}


export default Votes