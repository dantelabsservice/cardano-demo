import { GroupsList } from "@/components/organisms";
import { noPrintElement } from "@/theme";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  const handlePrintPage = () => {
    window.print();
  };

  return (
    <>
      <Heading as="h1" variant="page-heading">
        Ski groups
      </Heading>

      <Flex w="100%" justifyContent="center" sx={noPrintElement}>
        <Button variant="primary" role="button" onClick={handlePrintPage}>
          Print page
        </Button>
      </Flex>

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
