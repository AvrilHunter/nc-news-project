import Loading from "./Loading";
import Error from "./Error";
import { useSearchParams } from "react-router-dom";
import useTopics from "../hooks/useTopics";

function TopicSearch({ topic, setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTopics, loading, error, errMsg, errStatus] = useTopics();

  const onTopicChangeHandler = (event) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value === "all") {
      newParams.delete("topic");
      setSearchParams(newParams);
    } else {
      setTopic(event.target.value);
      newParams.set("topic", event.target.value);
      setSearchParams(newParams);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMsg={errMsg} errStatus={errStatus} />;
  }

  return (
    <>
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
    </>
  );
}

export default TopicSearch;
