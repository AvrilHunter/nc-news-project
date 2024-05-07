import ArticleThumbnail from "./ArticleThumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./Loading"
import Error from "./Error";

function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null);
   
    
    useEffect(() => {
      getAllArticles().then(({articles}) => {
        setAllArticles(articles)
        setLoading(false)
      }).catch((err) => {
        setError({ err });
      })
    }, []);
  
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
