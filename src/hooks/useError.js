import { useState } from "react";

function useError() {
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");

  const errorWrapper = (callback) => {
    return callback()
      .catch((err) => {
        setError(true);
        setErrMsg(err.response.data.message);
        setErrStatus(err.response.status);
      })
  }
  return [errorWrapper, error, errMsg, errStatus];
}

export default useError;