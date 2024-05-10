import ArticleThumbnail from "./ArticleThumbnail";

import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";

import SearchQueries from "./SearchQueries";
import LoadMore from "./LoadMore";
import useArticles from "./hooks/useArticles";

function AllArticles({ setTopic }) {

const {loading, error, errMsg, errStatus, page, setPage, allArticles, articleCount} = useArticles()

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus}/>;
  }

  return (
    <>
      <div>
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
