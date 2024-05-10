import { useEffect, useState } from "react";
import { getTopics } from "../../apis";
import useLoading from "./useLoading";
import useError from "./useError";

function useTopics() {
  const [errorWrapper, error, errMsg, errStatus] = useError();
  const [loading, loadingWrapper] = useLoading();
  const [allTopics, setAllTopics] = useState([]);
  
    useEffect(() => {
      loadingWrapper(() => {
        return errorWrapper(() => {
          return getTopics().then((topics) => {
            setAllTopics(topics);
          });
        });
      });
    }, []);
  
  return [allTopics, loading, error, errMsg, errStatus]
}

export default useTopics