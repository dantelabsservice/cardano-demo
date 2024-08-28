import React from "react";
import { useLoadingNavigation } from "@/hooks/useLoadingNavigation";
import Head from "next/head";
import { useRouter } from "next/router";
import { theme } from "@/theme/theme";
import { ChakraProvider, CircularProgress, Flex } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { HomeLayout } from "@/components/templates";
import { PageLayout } from "@/components/templates/PageLayout";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/apollo/client";
import * as SiteData from "@/data/site.json";

const Loading = () => (
  <Flex
    pos="fixed"
    alignItems="center"
    justifyContent="center"
    h="100%"
    w="100%"
    top={0}
    left={0}
    bgColor="whiteAlpha.700"
    zIndex={100}
  >
    <CircularProgress isIndeterminate color="primary" />
  </Flex>
);

const MyApp = ({ Component: Page, pageProps }: AppProps) => {
  const { isLoading } = useLoadingNavigation();
  const router = useRouter();

  const Layout = pageProps.template === "home" ? HomeLayout : PageLayout;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1"
        />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${SiteData.seo.title}`}
        openGraph={{
          type: "website",
          locale: "nl",
          url: "",
          siteName: SiteData.seo.title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        canonical={canonicalUrl}
        {...pageProps.seo}
      />

      <ApolloProvider client={client}>
        <ChakraProvider theme={theme} resetCSS>
          <Layout pageProps={pageProps}>
            {isLoading && <Loading />}
            <Page {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
