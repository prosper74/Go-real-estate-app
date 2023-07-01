import "@styles/globals.css";

import React, { FC, useState } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import configureStore from "@src/store";
import Layout from "@src/components/common/layouts/layout";
import { PageLoader } from "@src/components/common/loader";
import { useIsClient } from "@src/components/common/hooks/useIsClient";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isClient, key } = useIsClient();

  Router.events.on("routeChangeStart", () => {
    if (window.pageYOffset > 200) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
  });

  if (!isClient) return null;

  return (
    <>
      <Provider store={configureStore}>
        <Layout key={key}>
          {isLoading ? <PageLoader /> : <Component {...pageProps} />}
        </Layout>
      </Provider>
    </>
  );
};
export default MyApp;
