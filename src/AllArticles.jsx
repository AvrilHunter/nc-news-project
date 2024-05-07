import ArticleThumbnail from "./Article-thumbnail";
import { getAllArticles } from "../apis";

import { useEffect, useState } from "react";

function AllArticles() {
    const [allArticles, setAllArticles] = useState([]);
    
    useEffect(() => {
      getAllArticles().then(({articles}) => {
        setAllArticles(articles)
      });
    }, []);

  return (
    <div className="flex">
          {allArticles.map((article) => {
            return(
                <ArticleThumbnail article={article} key = {article.article_id} />)
     })}
    </div>
  );
}

export default AllArticles;
