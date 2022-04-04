import { useState } from "react";

export const useHOCReloadCounter = () => {
  const [counter, setCounter] = useState(0);

  //
  return {
    counter,
    setCounter,
    reloadState: () => setCounter((counter) => ++counter),
  };
};
