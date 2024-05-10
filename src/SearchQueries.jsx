import { useSearchParams } from "react-router-dom";
import TopicSearch from "./TopicSearch";

function SearchQueries({setTopic}) {
  const [searchParams, setSearchParams] = useSearchParams({});

  const onSortChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  };

  const onOrderChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    setSearchParams(newParams);
  };

  const onLimitChangeHandler = (event) => {
     const newParams = new URLSearchParams(searchParams);
     newParams.set("limit", event.target.value);
     setSearchParams(newParams);
  }

  return (
    <>
      <form>
      <TopicSearch setTopic={setTopic} />
        <label htmlFor="sort"></label>
        <select id="sort" name="sort" onChange={onSortChangeHandler}>
          <option value="">Sort by...</option>
          <option value="created_at">Date Posted</option>
          <option value="votes">Number of votes</option>
          <option value="comment_count">Number of comments</option>
        </select>
        <label htmlFor="order"></label>
        <select id="order" name="order" onChange={onOrderChangeHandler}>
          <option value="">Order by...</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <label htmlFor="limit"></label>
        <select id="limit" name="limit" onChange={onLimitChangeHandler}>
          <option value="">Number per page...</option>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </form>
    </>
  );
}

export default SearchQueries;
