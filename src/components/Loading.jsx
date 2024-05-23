import { useLottie } from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";

function Loading() {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}

export default Loading;
