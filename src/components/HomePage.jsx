import { useEffect } from "react";
import AllArticles from "./AllArticles";
import SearchQueries from "./SearchQueries";
import { useSearchParams } from "react-router-dom";

function HomePage({ topic, setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("topic");
    newParams.delete("p");
    newParams.delete("limit");
    newParams.delete("sort_by");
    newParams.delete("order");
    setSearchParams(newParams);
  }, []);

  return (
    <div>
      <SearchQueries setTopic={setTopic} />
      <AllArticles topic={topic} />
    </div>
  );
}

export default HomePage;
