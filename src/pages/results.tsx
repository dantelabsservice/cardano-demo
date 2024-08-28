import { SearchResult } from "@/components/organisms";
import { Heading } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import * as PageData from "@/data/results.json";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Heading as="h1" variant="page-heading">
        {PageData.pageHeading}
      </Heading>
      <SearchResult />
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      template: "page",
      seo: {
        title: PageData.seo.title,
        description: PageData.seo.description,
      },
    },
  };
};

export default Page;
