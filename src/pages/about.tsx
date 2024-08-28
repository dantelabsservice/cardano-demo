import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <Heading as="h1" size="xl" variant="page-heading">
        About Ski Trip Group Manager
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Welcome to the Ski Trip Group Manager, your go-to tool for organizing
        ski trails and ensuring each group in your ski trip has the perfect
        experience. Our platform is designed to help you match your groups with
        the most suitable ski trails based on their size and skill level.
      </Text>

      <Box as="section" my="3xl">
        <Heading as="h2" size="md" mb="lg">
          What You Can Do
        </Heading>
        <List as="ul">
          <ListItem>
            <strong>Organize Groups:</strong> Easily input the size of each
            group, whether small or large.
          </ListItem>
          <ListItem>
            <strong>Select Trail Difficulty:</strong> Choose the ideal trail
            difficulty level to match the skills of each group.
          </ListItem>
          <ListItem>
            <strong>View Trail Details:</strong> Get a comprehensive overview of
            each available trail, including difficulty, grooming status, and
            lift information.
          </ListItem>
          <ListItem>
            <strong>Filter and Match Trails:</strong> Quickly find the most
            suitable trails by filtering based on difficulty, grooming status,
            and lift elevation gain.
          </ListItem>
        </List>
      </Box>

      <Box as="section" my="xl">
        <Heading as="h2" size="md" mb="lg">
          How to Use the Platform
        </Heading>
        <List as="ol" sx={{
          "li": {
            mt: "md",
          },
        }}>
          <ListItem>
            <strong>Step 1: Enter Group Size</strong>
          </ListItem>
          <Text>
            Start by entering the size of the group you’re planning to assign to
            a ski trail. Whether you have a small family or a large team, the
            platform can accommodate your needs.
          </Text>

          <ListItem>
            <strong>Step 2: Choose Trail Difficulty</strong>
          </ListItem>
          <Text>
            Select the difficulty level that matches the skill level of the
            group. This ensures everyone has a safe and enjoyable experience.
          </Text>

          <ListItem>
            <strong>Step 3: Explore Trail Details</strong>
          </ListItem>
          <Text>
            Browse through the detailed list of ski trails. Here, you’ll find
            important information like trail difficulty, whether the trail is
            groomed, and the number of lifts required to reach the summit.
          </Text>

          <ListItem>
            <strong>Step 4: Apply Filters</strong>
          </ListItem>
          <Text>
            If you need to narrow down your options, use our filtering tools.
            You can filter trails by difficulty, grooming status, and the
            minimum lift elevation gain, helping you find the best match for
            each group.
          </Text>

          <ListItem>
            <strong>Step 5: Match and Assign Trails</strong>
          </ListItem>
          <Text>
            Once you’ve found a suitable trail, assign the group to that trail.
            The platform will guide you through the process, ensuring that every
            group is matched with the perfect trail.
          </Text>
        </List>
      </Box>

      <Box as="section" my="xl">
        <Heading as="h2" size="md" my="xl">
          Why Choose Ski Trip Group Manager?
        </Heading>
        <Text>
          Our platform simplifies the process of organizing ski trips, ensuring
          that each group has an experience tailored to their needs. With an
          easy-to-use interface and powerful filtering options, you can
          confidently plan a ski trip that everyone will enjoy.
        </Text>
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
