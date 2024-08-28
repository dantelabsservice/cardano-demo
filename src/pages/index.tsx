import HomeForm from "@/components/organisms/HomeForm";
import { Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import * as PageData from "@/data/home.json";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Text>{PageData.trailsSearchForm.description}</Text>
      <HomeForm />
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      template: "home",
      pageHeading: PageData.heading,
      seo: {
        title: PageData.seo.title,
        description: PageData.seo.description,
      },
    },
  };
};

export default Page;
