import ArticleThumbnail from "./Article-thumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./Loading"

function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading]=useState(true)
    
    useEffect(() => {
      getAllArticles().then(({articles}) => {
        setAllArticles(articles)
        setLoading(false)
      }).catch((err) => {
        console.log(err);
      })
    }, []);
  
  if(loading){return <Loading/>}
  
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
