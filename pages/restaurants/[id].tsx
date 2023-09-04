import type { NextPage } from "next";
import { useRouter } from "next/router";

const Detail: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <h4>{router.query.restaurant || "Loading..."}</h4>
    </>
  );
};

export default Detail;
