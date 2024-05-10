import { useState, useEffect } from "react";
import { getTopics } from "../apis";
import Loading from "./styleFunctionComponents/Loading";
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";

function TopicSearch({ setTopic }) {
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");


  useEffect(() => {
    getTopics()
      .then((topics) => {
        setLoading(false);
        setAllTopics(topics);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
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
      {/* <label htmlFor="choose-topic-form">Select articles by topic</label> */}
     
        <label htmlFor="choose-topic"></label>
        <select id="choose-topic" name="topics" title="choose-topic" onChange={onTopicChangeHandler}>
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
