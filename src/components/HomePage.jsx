import AllArticles from "./AllArticles";
import SearchQueries from "./SearchQueries";

function HomePage({ topic, setTopic }) {
  return (
    <div>
      <SearchQueries setTopic={setTopic} />
      <AllArticles topic={topic} />
    </div>
  );
}

export default HomePage;
