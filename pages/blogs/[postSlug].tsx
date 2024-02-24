import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const SinglePage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router);
  return <div>SinglePage</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { postSlug: "clever-lazy-loading-for-javascript" } }],
    fallback: false, // we will come to this later and understand this with example.
  };
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default SinglePage;
