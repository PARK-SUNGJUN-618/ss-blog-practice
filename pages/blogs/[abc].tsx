import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const SinglePage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router);
  return <div>SinglePage</div>;
};

export default SinglePage;
