import HomeForm from "@/components/organisms/HomeForm";
import { Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Text>
        Fill in the form with the information about your group to find the best
        ski activities that suits best for your team.
      </Text>
      <HomeForm />
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      pageHeading: "Welcome to the Ski Trip Manager",
      seo: {
        title: "Homepage",
        description: "This is the homepage",
      },
    },
  };
};

export default Page;
