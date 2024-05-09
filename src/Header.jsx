import { Link } from "react-router-dom";
import TopicSearch from "./TopicSearch";



function Header() {
  return (
    <div id="flex-header">
      <Link to={`/`} id="flex-header">
        <h1>NC News and Logo</h1>
      </Link>
      <button className="buttonDesign">Post New Article</button>
    </div>
  );
}

export default Header;