import { useState } from "react";

function Expandable({ children, defaultText, secondText, open }) {
  const [showing, setShowing] = useState(open);

  const handleClick = () => {
    setShowing(!showing);
  };

  return (
    <div className="expandable">
      <button onClick={handleClick} className="buttonDesign">
        {showing ? defaultText : secondText}
      </button>
      {showing && children}
    </div>
  );
}

export default Expandable;

// {
//   children, text, secondText;
// }
