import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import * as PageData from "@/data/about.json";
import React from "react";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <Heading as="h1" size="xl" variant="page-heading">
        {PageData.heading}
      </Heading>
      <Text fontSize="lg" textAlign="center">
        {PageData.description}
      </Text>

      <Box as="section" my="3xl">
        <Heading as="h2" size="md" mb="lg">
          {PageData.whatYouCanDo.heading}
        </Heading>
        <List as="ul">
          {PageData.whatYouCanDo.items.map(({ title, description }) => (
            <React.Fragment key={title}>
              <ListItem>
                <strong>{title}:</strong> {description}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box as="section" my="xl">
        <Heading as="h2" size="md" mb="lg">
          {PageData.howToUse.heading}
        </Heading>
        <List
          as="ol"
          sx={{
            li: {
              mt: "md",
            },
          }}
        >
          {PageData.howToUse.steps.map(({ title, description }) => (
            <React.Fragment key={title}>
              <ListItem>
                <strong>{title}</strong>
              </ListItem>
              <Text>{description}</Text>
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box as="section" my="xl">
        <Heading as="h2" size="md" my="xl">
          {PageData.whyChoose.heading}
        </Heading>
        <Text>{PageData.whyChoose.description}</Text>
      </Box>
    </>
  );
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
