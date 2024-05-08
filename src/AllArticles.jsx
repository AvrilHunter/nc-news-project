import ArticleThumbnail from "./ArticleThumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./Loading"
import Error from "./Error";
import { useSearchParams } from "react-router-dom";

function AllArticles({ topic }) {
  
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams()

  useEffect(() => {  
    const topic = searchParams.get("topic");
    let params = { params: {} }
    topic === "all" ? null : params.params = { topic: topic } 
    setLoading(true)
    getAllArticles(params).then(({ articles }) => {
      setAllArticles(articles)
     setLoading(false);

    }).catch((err) => {
        setLoading(false);
        setError({ err });
      })
    }, [topic]);
  
  if (loading) { return <Loading /> }
  
   if (error) {
     return <Error />;
   }
  
  return (
      <ul className="flex">
      {allArticles.map((article) => {
          return (
            <ArticleThumbnail article={article} key={article.article_id} />
          );
        })}
      </ul>
  );
}

export default AllArticles;
