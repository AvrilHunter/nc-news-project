import { useState } from "react";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";

function SearchQueries() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [error, setError] = useState(null);
  // const [sortBy, setSortBy] = useState("date");
  //const [order, setOrder] = useState("asc");

  const onSortChangeHandler = (event) => {
    const currentParams = Object.fromEntries([...searchParams]);
    currentParams.sort_by = event.target.value
    setSearchParams(currentParams)
    console.log(currentParams);
  };

  const onOrderChangeHandler = (event) => {
        const currentParams = Object.fromEntries([...searchParams]);
        currentParams.order = event.target.value;
        setSearchParams(currentParams);
  };

  //check loading and errors
  //force some errors.
  //should only be available on the main screen
  //need to work together and not seperately.

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
