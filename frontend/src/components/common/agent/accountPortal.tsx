import React, { FC } from "react";
import UserTab from "./userTab";

const AccountPortal: FC = () => {
  return (
    <main className="px-4 mx-auto mt-24 sm:px-10 lg:px-32">
      <UserTab />
    </main>
  );
};

export default AccountPortal;
