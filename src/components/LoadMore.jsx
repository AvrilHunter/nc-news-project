import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function LoadMore({ page, setPage, totalCount }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(num) {
    setPage((currentPage) => currentPage + num);
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page);
    setSearchParams(newParams);
  }, [page]);

  return (
    <>
      <button
        onClick={() => {
          handleClick(-1);
        }}
        className="buttonDesign"
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          handleClick(1);
        }}
        className="buttonDesign"
        disabled={page > Math.floor(totalCount / 10)}
      >
        Next Page
      </button>
    </>
  );
}

export default LoadMore;
