import { useSearchParams } from "react-router-dom";
import TopicSearch from "./TopicSearch";

function SearchQueries({ setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams({});

  const onChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "") {
      newParams.delete("sort_by");
      newParams.delete("order");
      setSearchParams(newParams);
    } else {
      const query = event.target.value.split("-");
      const key = query[0];
      const order = query[1].toUpperCase();
      newParams.set("sort_by", key);
      newParams.set("order", order);
      setSearchParams(newParams);
    }
  };

  const onLimitChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "") {
      newParams.delete("limit");
      setSearchParams(newParams);
    } else {
      newParams.set("limit", event.target.value);
      setSearchParams(newParams);
    }
  };

  return (
    <>
      <form className="search-form">
        <TopicSearch setTopic={setTopic} />
        <label htmlFor="sort" hidden>
          Sort by:{" "}
        </label>
        <select
          id="sort"
          name="sort"
          aria-label="sort by"
          onChange={onChangeHandler}
        >
          <option value="">Sort by...</option>
          <option value="created_at-asc">Date oldest-newest</option>
          <option value="created_at-desc">Date newest-oldest</option>
          <option value="votes-desc">Votes highest-lowest</option>
          <option value="votes-asc">Votes lowest-highest</option>
          <option value="comment_count-desc">Comments highest-lowest</option>
          <option value="comment_count-asc">Comments lowest-highest</option>
        </select>
        <label htmlFor="limit" hidden>
          Display of results per page:{" "}
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
