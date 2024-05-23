import Loading from "./Loading";
import Error from "./Error";
import { useSearchParams } from "react-router-dom";
import useTopics from "../hooks/useTopics";

function TopicSearch({ setTopic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTopics, loading, error, errMsg, errStatus] = useTopics();

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
        <option value="">Search topic</option>
        {allTopics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default TopicSearch;
