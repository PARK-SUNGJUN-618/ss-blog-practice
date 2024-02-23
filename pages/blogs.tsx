import BlogCard from "@/components/BlogCard";
import { NextPage } from "next";

interface Props {}

const Blogs: NextPage<Props> = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      <BlogCard
        title="This is my blog"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, rerum optio. Ullam quam vel aut culpa autem assumenda laboriosam iste!"
      />
      <BlogCard
        title="This is my blog"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, rerum optio. Ullam quam vel aut culpa autem assumenda laboriosam iste!"
      />
      <BlogCard
        title="This is my blog"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, rerum optio. Ullam quam vel aut culpa autem assumenda laboriosam iste!"
      />
    </div>
  );
};

export default Blogs;
