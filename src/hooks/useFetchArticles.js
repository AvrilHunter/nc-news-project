
import { useSearchParams } from "react-router-dom";
import { getAllArticles } from "../../apis"
import { useEffect, useState } from "react";

function useFetchArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [page, setPage] = useState(1);

  const order = searchParams.get("order");
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const p = searchParams.get("p");
  const limit = searchParams.get("limit");

  useEffect(() => {
    let params = new URLSearchParams(searchParams)
    setLoading(true);
    getAllArticles(params)
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

  return { loading, error, errMsg, errStatus, page, setPage, allArticles, articleCount }
}

export default useFetchArticles