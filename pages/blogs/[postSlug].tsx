import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
// import { useRouter } from "next/router";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  // console.log("props:", props);
  // const router = useRouter();
  // console.log("router:", router);

  const { content, title } = post;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-semibold text-3xl py-5">{title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...content} />
      </div>
      {/* <p>{props.post.content}</p> */}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  //   const router = useRouter();

  //   if (router.isFallback) {
  //     return <p>Loading...</p>;
  //   }

  // reading paths
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const paths = dirs.map((filename) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  // console.log("paths:", paths);

  // fallback options
  // 1. false => this will return 404 page for new unknown slug
  // 2. blocking => this will first see the slug and it will try to get data
  //            from static pages and if there is page it will first hang
  //            the browser and try to generate new page
  // 3. true => return the fake page for some time and once the data is ready
  //            it will serve them page props

  return {
    paths,
    fallback: "blocking", // we will come to this later and understand this with example.
  };
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  // console.log(context);

  try {
    const { params } = context;
    const { postSlug } = params as IStaticProps;
    const filePathToRead = path.join(
      process.cwd(),
      "posts/" + postSlug + ".md"
    );
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });

    // const { content, data } = matter(fileContent);
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
