import { Link } from "react-router-dom";
import TopicSearch from "./TopicSearch";


function Header({ setTopic, topic }) {
  return (
    <div id="flex-header">
      <Link to={`/`} id="flex-header">
        <h1>NC News and Logo</h1>
      </Link>

      <TopicSearch setTopic={setTopic} />

      <button className="buttonDesign">Post New Article</button>
    </div>
  );
}

export default Header;