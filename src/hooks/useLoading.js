import { useState } from "react";

function useLoading() {

  const [loading, setLoading] = useState(true);

  const loadingWrapper = (callback) => {
    setLoading(true)
    return callback().finally(() => {
      setLoading(false)
    })
  }
  return [loading, loadingWrapper]
}

export default useLoading