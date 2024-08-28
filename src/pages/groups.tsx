import { GroupsList, SearchResult } from "@/components/organisms";
import { Flex, Heading } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Heading as="h1" variant="page-heading">
        Ski groups
      </Heading>

      <Flex w="100%" justifyContent="center">
        <GroupsList />
      </Flex>
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
