import '@styles/globals.css';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import configureStore from '@src/store';
import Layout from '@src/components/common/layouts/layout';
import { PageLoader } from '@src/components/common/loader';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(0)

  Router.events.on('routeChangeStart', () => {
    if (window.pageYOffset > 200) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/token-and-user-id`)
      .then((res) => {
        setUserID(res.data.user_id);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("UserID: ", userID)

  return (
    <>
      <Provider store={configureStore}>
        <Layout>
          {isLoading ? <PageLoader /> : <Component {...pageProps} />}
        </Layout>
      </Provider>
    </>
  );
};
export default MyApp;
