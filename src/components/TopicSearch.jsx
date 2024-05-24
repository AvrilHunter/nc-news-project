import Loading from "./Loading";
import Error from "./Error";
import { useSearchParams } from "react-router-dom";
import useTopics from "../hooks/useTopics";

function TopicSearch({ topic, setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTopics, loading, error, errMsg, errStatus] = useTopics();
console.log(topic, "IS topic set here?");
  const onTopicChangeHandler = (event) => {
    setTopic(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", event.target.value);
    setSearchParams(newParams);
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
        <option value="Filter by..." key="all">
          Filter by...
        </option>
        {allTopics.map((topicObject) => {
          return (
            <>
              {topic === topicObject.slug ? (
                <option
                  value={topicObject.slug}
                  key={topicObject.slug}
                  selected
                >
                  {topicObject.slug}
                </option>
              ) : (
                <option value={topicObject.slug} key={topicObject.slug}>
                  {topicObject.slug}
                </option>
              )}
            </>
          );
        })}
      </select>
    </>
  );
}

export default TopicSearch;
