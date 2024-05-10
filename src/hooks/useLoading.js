import { useState } from "react";

function useLoading(initialLoadingState) {

  const [loading, setLoading] = useState(initialLoadingState);

  const loadingWrapper = (callback) => {
    setLoading(true)
    return callback().finally(() => {
      setLoading(false)
    })
  }
  
  return [loading, loadingWrapper]
}

export default useLoading