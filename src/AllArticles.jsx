import ArticleThumbnail from "./ArticleThumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";
import SortQueries from "./SearchQueries";
import TopicSearch from "./TopicSearch";

function AllArticles({ topic, setTopic }) {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams(currentParams)  
    const axiosParams = {params: currentParams}
    setLoading(true);
    getAllArticles(axiosParams)
      .then(({ articles }) => {
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError({ err });
      });
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="flex">
        <SortQueries />
        <TopicSearch topic={topic} setTopic={setTopic} />
      </div>
      <ul className="flex">
        {allArticles.map((article) => {
          return (
            <ArticleThumbnail article={article} key={article.article_id} />
          );
        })}
      </ul>
    </>
  );
}

export default AllArticles;
