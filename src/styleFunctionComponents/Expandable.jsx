import { useState } from "react";

function Expandable({ children }) {
  const [showing, setShowing] = useState(false);

  const handleClick = () => {
    setShowing(!showing);
  };

  return (
    <div className="expandable">
      <button onClick={handleClick} className="buttonDesign">
        {showing ? "Hide Comments" : "Show Comments"}
      </button>
      {showing && children}
    </div>
  );
}

export default Expandable;
