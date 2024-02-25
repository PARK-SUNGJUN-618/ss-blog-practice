import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

interface Props {}

const SinglePage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router);
  return <div>SinglePage</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  // reading paths
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  return {
    paths,
    fallback: false, // we will come to this later and understand this with example.
  };
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};

export default SinglePage;
