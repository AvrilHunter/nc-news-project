import { useSearchParams } from "react-router-dom";

function SearchQueries() {
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

  //force some errors.
  //should only be available on the main screen

  return (
    <>
      <form>
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" name="sort" onChange={onSortChangeHandler}>
          <option value="">Sort by...</option>
          <option value="created_at">Date Posted</option>
          <option value="votes">Number of votes</option>
          <option value="comment_count">Number of comments</option>
        </select>
        <label htmlFor="order">Order:</label>
        <select id="order" name="order" onChange={onOrderChangeHandler}>
          <option value="">order by...</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </form>
    </>
  );
}

export default SearchQueries;
