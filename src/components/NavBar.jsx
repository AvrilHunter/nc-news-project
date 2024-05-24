import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Link to={`/`}>
        <button className="buttonDesign">Home</button>
      </Link>
      <Link to={`/new-article`}>
        <button className="buttonDesign">Post New Article</button>
      </Link>
      <Link to={`/login`}>
        <button className="buttonDesign">Log In</button>
      </Link>
    </>
  );
}
export default NavBar;
