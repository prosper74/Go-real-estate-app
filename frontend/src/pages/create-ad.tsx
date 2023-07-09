// index.tsx
import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import AuthPortal from "@src/components/auth";
import Link from "next/link";
import AuthButton from "@src/components/common/Buttons/authButton";
import { UserProps } from "@src/components/common/interfaces";
import { CreateAdForm } from "@src/components/common/forms/createAdForm";
import VerificationModal from "@src/components/common/agent/verificationModal";

interface IProps {
  user: UserProps;
}

const CreateAdPage: FC = () => {
  const user = useSelector((state: IProps) => state.user);
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  useEffect(() => {
    if (user.userId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REST_API}/auth/dashboard?id=${user.userId}`
        )
        .then((res) => {
          if (res.data.error) {
            console.error(res.data.error);
          } else {
            setFetchedUser(res.data.user);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Create New Ad</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="px-4 mx-auto mt-24 sm:!px-10 lg:!px-32">
        <div>
          {!user.onboarding && !user.jwt ? (
            <>
              <h3 className="font-bold text-center text-xl mt-24 mb-10">
                Please login or create an account before you can post an ad
              </h3>
              <AuthButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonText="Login"
              />
              <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          ) : fetchedUser?.Verified === 0 ? (
            <>
              <h1 className="font-bold text-center text-3xl mt-28 mb-4">
                Your account is not yet veirifed!
              </h1>
              <h1 className="font-bold text-center text-xl mb-3">
                Please verify your account to create ads
              </h1>
              <Link
                href="/agent/account"
                className="w-20 mx-auto py-2 transition duration-200 text-white bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center"
              >
                Verify
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-bold text-center text-3xl mt-28 mb-10">
                Create New Ad
              </h1>
              {/* @ts-ignore */}
              <CreateAdForm />
            </>
          )}
        </div>

        <VerificationModal
          isOpen={verificationModalOpen}
          setIsOpen={setVerificationModalOpen}
        />
      </main>
    </>
  );
};

export default CreateAdPage;
