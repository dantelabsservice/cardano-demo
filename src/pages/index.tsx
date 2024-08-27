import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return <div>Homepage</div>;
};

const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      seo: {
        title: "Homepage",
        description: "This is the homepage",
      },
    },
  };
};

export default Page;
