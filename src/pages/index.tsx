import { NumberInput, SelectInput, TextInput } from "@/components/atoms";
import { Button, Flex, Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Text>
        Fill in the form with the information about your group to find the best
        ski activities that suits best for your team.
      </Text>
      <Flex flexDir={{ base: "column", md: "row" }} gap={{base: "none", md: "lg"}}>
        <NumberInput label="Number of people" />
        <SelectInput
          label="Skill level"
          options={["Beginner", "Intermediate", "Advanced"]}
        />
      </Flex>
      <Button variant="primary" type="submit" width="100%">
        Find activities
      </Button>
    </>
  );
};

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
  return {
    props: {
      pageHeading: "Welcome to the Ski Manager Tool",
      seo: {
        title: "Homepage",
        description: "This is the homepage",
      },
    },
  };
};

export default Page;
