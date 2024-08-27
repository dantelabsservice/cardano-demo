import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = () => {
  return <div>About</div>;
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      seo: {
        title: "About",
        description: "This is the about page",
      },
    },
  };
};

export default Page;
