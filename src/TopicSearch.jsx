import { useState, useEffect } from "react";
import { getTopics } from "../apis";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";
import useLoading from "./hooks/useLoading";
import useError from "./hooks/useError";

function TopicSearch({ setTopic }) {
  const [errorWrapper, error, errMsg, errStatus] = useError()
  const [loading, loadingWrapper] = useLoading();
  const [allTopics, setAllTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadingWrapper(() => {
      return errorWrapper(() => {
        return getTopics().then((topics) => {
          setAllTopics(topics);
        });
      })
    });
  }, []);

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
