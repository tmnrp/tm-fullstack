import { useEffect, useState } from "react";

export const useHOCIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  //
  return {
    isMounted,
    setIsMounted,
  };
};
