import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import UserDropdown from "./userDropdown";
import AuthPortal from "@src/components/auth";
import { UserProps } from "../helpers/interfaces";
import AuthButton from "../Buttons/authButton";
import {
  HomeIcon,
  RentIcon,
  SettingsIcon,
  ShortletIcon,
  UserIcon,
} from "../helpers/svgIcons";
import Image from "next/image";

interface IProps {
  user: UserProps;
}

const Navbar: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const [selectedNav, setSelectedNav] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf("/buy") > -1) {
      setSelectedNav("buy");
    } else if (window.location.href.indexOf("/rent") > -1) {
      setSelectedNav("rent");
    } else if (window.location.href.indexOf("/shortlet") > -1) {
      setSelectedNav("shortlet");
    } else {
      setSelectedNav("");
    }
  });

  return (
    <div className="container text-center mx-auto">
      {/* Desktop Menu */}
      <section className="shadow-lg fixed top-0 inset-x-0 w-full text-gray-700 font-heading font-medium bg-gray-50 bg-opacity-100 z-[10000]">
        <nav className="flex justify-between px-4 md:px-2 xl:px-32 py-2">
          <div className="flex w-full items-center">
            <Link href="/">
              <Image className="h-9" src="/logo.svg" alt="Safe Haven Logo" />
            </Link>
            <ul className="hidden md:flex px-4 ml-24 md:ml-10 xl:ml-32">
              <li className="mr-16">
                <Link href="/buy">
                  <button
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === "buy" ? "text-purple-500" : ""
                    }`}
                  >
                    Buy
                  </button>
                </Link>
              </li>
              <li className="mr-16">
                <Link href="/rent">
                  <button
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === "rent" ? "text-purple-500" : ""
                    }`}
                  >
                    Rent
                  </button>
                </Link>
              </li>
              <li className="mr-16">
                <Link href="/shortlet">
                  <button
                    className={`text-base text-gray-500 hover:text-purple-500 uppercase ${
                      selectedNav === "shortlet" ? "text-purple-500" : ""
                    }`}
                  >
                    Shortlet
                  </button>
                </Link>
              </li>
            </ul>

            {/* User buttons  */}
            {user.jwt && user.onboarding ? (
              <div className="flex items-center ml-auto">
                <UserDropdown />
              </div>
            ) : (
              <AuthButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonText="Login"
              />
            )}
          </div>
        </nav>
      </section>
      {/* End of Desktop menu */}

      {/* Mobile menu  */}
      <nav className="fixed bottom-0 inset-x-0 bg-gray-50 md:hidden flex justify-between text-sm text-gray-700 uppercase font-mono rounded-t-lg shadow-inner z-[10000] px-4">
        <Link href="/buy">
          <button className="w-full flex flex-col items-center py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500 transition duration-300">
            <HomeIcon dimensions="w-7 h-7" fill="#9932cc" />
            Buy
          </button>
        </Link>

        <Link href="/rent">
          <button className="w-full flex flex-col items-center py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <RentIcon dimensions="w-7 h-7" fill="#9932cc" />
            Rent
          </button>
        </Link>

        <Link href="/shortlet">
          <button className="w-full flex flex-col items-center py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
            <ShortletIcon dimensions="w-7 h-7" fill="#9932cc" />
            Shortlet
          </button>
        </Link>

        {user.jwt && user.onboarding ? (
          <Link href="/agent/account">
            <button className="w-full flex flex-col items-center py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500">
              <SettingsIcon dimensions="w-7 h-7" fill="#9932cc" />
              Account
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex flex-col items-center py-2 px-3 text-center hover:bg-purple-100 hover:text-purple-500"
          >
            <UserIcon dimensions="w-7 h-7" fill="#9932cc" />
            Login
          </button>
        )}
      </nav>
      {/* Mobile menu ends here  */}

      {/* Auth Modal Popup */}
      <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;

{
  /* <CloudinaryImage
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                  publicId={
                    user?.Image || fetchedUser?.Image || "/avatar_icon.webp"
                  }
                  alt="User settings"
                  width="40"
                  height="40"
                  crop="scale"
                  className="rounded-full object-cover"
                /> */
}
