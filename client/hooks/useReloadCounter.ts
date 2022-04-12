import { useState } from "react";

export const useReloadCounter = () => {
  const [counter, setCounter] = useState(0);

  //
  return {
    counter,
    setCounter,
    reloadState: () => setCounter((counter) => ++counter),
  };
};
