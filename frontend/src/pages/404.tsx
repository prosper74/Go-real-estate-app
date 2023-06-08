import React, { FC } from "react";
import Head from "next/head";
import Link from "next/link";

const FourOhFour: FC = () => {
  return (
    <>
      <Head>
        <title>Page Not Fount</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="px-4 mx-auto mt-16 mb-32 sm:!px-10 lg:!px-32">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-purple-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page not found
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              The page you are looking for does not exist.
            </p>
            <Link href="/">
              <span className="px-6 py-2 text-sm font-semibold text-purple-600 bg-blue-100 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-xl transition-all duration-300">
                Go home
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="https://res.cloudinary.com/prosper-dev/image/upload/v1647206183/404_spyq1i.svg"
              alt="img"
              className="w-full h-full"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default FourOhFour;
