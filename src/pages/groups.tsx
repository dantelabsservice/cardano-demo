import { GroupsList } from "@/components/organisms";
import { printSchema } from "@/theme";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import * as PageData from "@/data/groups.json";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  const handlePrintPage = () => {
    const printContent = document.getElementById("content-page");
    const printWindow = window.open("", "_blank");

    const htmlSchema = printSchema(printContent);

    printWindow?.document.write(htmlSchema);
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  };

  return (
    <>
      <Heading as="h1" variant="page-heading">
        {PageData.pageHeading}
      </Heading>

      <Flex w="100%" justifyContent="center" className="no-print">
        <Button variant="primary" role="button" onClick={handlePrintPage}>
          {PageData.printButtonText}
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
        title: PageData.seo.title,
        description: PageData.seo.description,
      },
    },
  };
};

export default Page;
