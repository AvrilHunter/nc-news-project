import ArticleThumbnail from "./ArticleThumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";
import SortQueries from "./SearchQueries";
import TopicSearch from "./TopicSearch";

function AllArticles({ setTopic }) {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setLoading(true);
    getAllArticles(currentParams)
      .then(({ articles }) => {
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
         console.log("am I in the catch block - all articles?");
        setLoading(false);
        setError(true)
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
      });
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus}/>;
  }

  return (
    <>
      <div className="flex">
        <SortQueries />
        <TopicSearch setTopic={setTopic} />
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
