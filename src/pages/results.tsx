import { SearchResult } from "@/components/organisms";
import { Heading } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Heading as="h1" variant="page-heading">Ski trail results</Heading>
      <SearchResult difficulty="advanced" isGroomed={true} elevationGain={1480} />
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      template: "page",
      seo: {
        title: "Ski trail results",
      },
    },
  };
};

export default Page;
