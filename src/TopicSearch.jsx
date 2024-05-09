import { useState, useEffect } from "react";
import { getTopics } from "../apis";
import Loading from "./styleFunctionComponents/Loading"
import Error from "./styleFunctionComponents/Error";
import { useSearchParams } from "react-router-dom";

function TopicSearch({ setTopic, topic }) {
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);

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
    
     if (error) {
       return <Error />;
     }
  

  return (
    <form>
      <label htmlFor="topic">Choose topic</label>
      <select id="topics" name="topics" onChange={onTopicChangeHandler}>
        <option value="">all topics</option>
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
