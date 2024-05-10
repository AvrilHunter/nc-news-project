import ArticleThumbnail from "./ArticleThumbnail";
import { getAllArticles } from "../apis";
import { useEffect, useState } from "react";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";
import SearchQueries from "./SearchQueries";
import LoadMore from "./LoadMore";

function AllArticles({ setTopic }) {
  const [allArticles, setAllArticles] = useState([]);
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [page, setPage] = useState(1);


  const order = searchParams.get("order")
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const p = searchParams.get("p");
  const limit = searchParams.get("limit")

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setLoading(true);
    getAllArticles(currentParams)
      .then(({ articles, total_count }) => {
        setArticleCount(total_count);
        setAllArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
      });
  }, [order, topic, sort_by, p, limit]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus}/>;
  }

  return (
    <>
      <div className="flex">
        <SearchQueries setTopic={setTopic} />
      </div>
      <ul className="flex no-bullet-point">
        {allArticles.map((article) => {
          return (
            <ArticleThumbnail article={article} key={article.article_id} />
          );
        })}
      </ul>
      <LoadMore page={page} setPage={setPage} totalCount={articleCount} />
    </>
  );
}

export default AllArticles;
