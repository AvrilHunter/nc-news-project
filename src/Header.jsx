import { Link } from "react-router-dom";

function Header() {
    return (
        <Link to={`/`} id="flex-header">
          <h1>NC News and Logo</h1>
          <button className="buttonDesign">Search</button>
          <button className="buttonDesign">Post New Article</button>
        </Link>
     
    );
}

export default Header