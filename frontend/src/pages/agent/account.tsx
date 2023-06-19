import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PageLoader } from '@src/components/common/loader';
import { UserProps } from '@src/components/common/interfaces';

interface IProps {
  user: UserProps;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccountPage: FC = () => {
  const user = useSelector((state: IProps) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.onboarding && !user.jwt) {
      router.push('/');
    }
  });

  return (
    <>
      {user.jwt && user.onboarding ? (
        <>
          <Head>
            <title>My account | {user.FirstName} {user.LastName}</title>
            <link rel="icon" href="/favicon.png" />
            <meta content={`${user.FirstName} account page`} />
          </Head>
          <AccountPortal />
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default AccountPage;
