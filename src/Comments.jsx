import { useEffect } from "react"
import { getCommentsByArticle } from "../apis";
import Loading from "./Loading";
import { useState } from "react";
import CommentCard from "./CommentCard";
import Expandable from "./Expandable";
import NewComment from "./NewComment";

function Comments({article_id, article, setArticle}) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        getCommentsByArticle(article_id).then((comments) => {
            setComments(comments)
            setLoading(false);
        }).catch((err) => {
             setError({ err });
        }) 
    }, [])

     if (loading) {
       return <Loading />;
     }
    
     if (error) {
       return <Error />;
     }
  
    return (
      <Expandable>
        <NewComment article_id={article_id} setComments={setComments} comments={comments} />
        <ul className = "comments-section">
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

export default Comments