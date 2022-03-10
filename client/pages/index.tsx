import { useRouter } from "next/router";
import { useEffect } from "react";
import { CONST_PAGES } from "../constants";

const Root = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(CONST_PAGES.LANDING.PATH);
  }, [router]);

  return <></>;
};

export default Root;
