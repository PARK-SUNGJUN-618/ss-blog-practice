import { InferGetStaticPropsType, NextPage } from "next";
import BlogCard from "@/components/BlogCard";

interface PostApiResponse {
  postInfo: {
    title: string;
    slug: string;
    meta: string;
  }[];
}

export const getStaticProps = async () => {
  const { postInfo }: PostApiResponse = await fetch(
    "http://localhost:3000/api/posts"
  ).then((data) => data.json());
  return {
    props: { postInfo: postInfo },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

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
    <div className="max-w-3xl mx-auto p-5 space-y-5 flex flex-col">
      {postInfo.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

export default Blogs;
