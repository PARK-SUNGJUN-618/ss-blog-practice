import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/posts").then((data) =>
    data.json()
  );
  return {
    props: { postInfo: res.postInfo },
  };
};

interface Props {}

const Blogs: NextPage<Props> = ({ postInfo }) => {
  // // Getting postInfo in a React environment, not nextjs environment
  // const [posts, setPosts] = useState<
  //   {
  //     title: string;
  //     slug: string;
  //     meta: string;
  //   }[]
  // >([]);
  //
  // const fetchPosts = async () => {
  //   const res = await fetch("/api/posts").then((data) => data.json());
  //   setPosts(res.postInfo);
  // };
  //
  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {postInfo.map((post, index) => (
        <BlogCard key={index} title={post.title} desc={post.meta} />
      ))}
    </div>
  );
};

export default Blogs;
