import { useState, useEffect } from "react";
import { getTopics } from "../apis";
import Loading from "./Loading";
import Error from "./Error";
import { useSearchParams } from "react-router-dom";

function TopicSearch({ setTopic }) {
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
    getTopics()
      .then((topics) => {
        setLoading(false);
        setAllTopics(topics);
      })
        .catch((err) => {
        setLoading(false);
        setError({ err });
      });
  }, []);

  const onTopicChangeHandler = (event) => {
    setTopic(event.target.value);
    setSearchParams({ topic: event.target.value });
  };

   if (loading) {
     return <Loading />;
   }

  return (
    <form>
      <label htmlFor="topic">Choose topic</label>
      <select id="topics" name="topics" onChange={onTopicChangeHandler}>
        <option value="all">all topics</option>
        {allTopics.map((topic) => {
          return (
            <option value={topic.slug} key={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </form>
  );
}

export default TopicSearch;
