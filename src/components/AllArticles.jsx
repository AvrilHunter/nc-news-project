import ArticleThumbnail from "./ArticleThumbnail";
import Loading from "./Loading";
import LoadMore from "./LoadMore";
import useArticles from "../hooks/useArticles";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

function AllArticles() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    errMsg,
    errStatus,
    page,
    setPage,
    allArticles,
    articleCount,
    setError,
  } = useArticles();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Error errMsg={errMsg} errStatus={errStatus} />
        <button className="buttonDesign"
          onClick={() => {
            setError(false);
            navigate("/");
          }}
        >
          Go back
        </button>
      </>
    );
  }

  return (
    <>
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
