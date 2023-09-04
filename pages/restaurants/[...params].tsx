import Seo from "@/components/Seo";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { NextRouter, useRouter } from "next/router";

type DetailParams = Array<string> | [];

const Detail: NextPage = ({
  params,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const router: NextRouter = useRouter();
  const [restaurant, id] = (params || []) as DetailParams;
  console.log(router);
  return (
    <>
      <Seo title={restaurant} />
      <h4>{restaurant || "Loading..."}</h4>
    </>
  );
};

export default Detail;

interface ServerSideParamsProps {
  params: {
    params: Array<string> | [];
  };
}

export const getServerSideProps = ({
  params: { params },
}: ServerSideParamsProps) => {
  return {
    props: {
      params,
    },
  };
};
