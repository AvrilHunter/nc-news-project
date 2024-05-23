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
      <form className = "search-form">
        <TopicSearch setTopic={setTopic} />
        <label htmlFor="sort" hidden>
          Sort by:{" "}
        </label>
        <select
          id="sort"
          name="sort"
          aria-label="sort by"
          onChange={onSortChangeHandler}
        >
          <option value="">Sort by...</option>
          <option value="created_at">Date Posted</option>
          <option value="votes">Number of votes</option>
          <option value="comment_count">Number of comments</option>
        </select>
        <label htmlFor="order" hidden>
          Order by
        </label>
        <select
          id="order"
          name="order"
          aria-label="order"
          onChange={onOrderChangeHandler}
        >
          <option value="">Order by...</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <label htmlFor="limit" hidden>
          Number of results per page:{" "}
        </label>
        <select
          id="limit"
          name="limit"
          aria-label="order"
          onChange={onLimitChangeHandler}
        >
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
