import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { PageLoader } from "@src/components/common/helpers/loader";
import { UserProps } from "@src/components/common/helpers/interfaces";
import AccountPortal from "@src/components/common/agent/accountPortal";

interface IProps {
  user: UserProps;
}

export default function AccountPage() {
  const user = useSelector((state: IProps) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.onboarding && !user.jwt) {
      router.push("/");
    }
  });

  return (
    <>
      {user.jwt && user.onboarding ? (
        <>
          <Head>
            <title>
              My account | {user.FirstName}
            </title>
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
}
