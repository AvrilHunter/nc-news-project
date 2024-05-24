import AllArticles from "./AllArticles";
import SearchQueries from "./SearchQueries";

function HomePage({ topic, setTopic }) {
  return (
    <div>
      <SearchQueries setTopic={setTopic} topic={topic} />
      <AllArticles topic={topic} setTopic={setTopic} />
    </div>
  );
}

export default HomePage;
