import Loading from "./Loading";
import Error from "./Error";
import { useSearchParams } from "react-router-dom";
import useTopics from "../hooks/useTopics";

function TopicSearch({ setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTopics, loading, error, errMsg, errStatus] = useTopics();

  const onTopicChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "all") {
      newParams.delete("topic");
      newParams.delete("p");
      setSearchParams(newParams);
    } else {
      setTopic(event.target.value);
      newParams.delete("p");
      newParams.set("topic", event.target.value);
      setSearchParams(newParams);
    }
  };

  if (loading) {
    return (
      <form className="loading-form">
        <label htmlFor="loading" hidden>
          Loading...{" "}
        </label>
        <select id="loading" name="loading" aria-label="loading">
          <option value="">Loading...</option>
        </select>
      </form>
    );
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <div>
      <label htmlFor="choose-topic"></label>
      <select
        id="choose-topic"
        name="topics"
        title="choose-topic"
        onChange={onTopicChangeHandler}
      >
        <option value="all" key="all">
          All topics
        </option>
        {allTopics.map((topicObject) => {
          return (
            <>
              <option value={topicObject.slug} key={topicObject.slug}>
                {topicObject.slug}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
}

export default TopicSearch;
