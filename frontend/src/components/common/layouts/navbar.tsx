import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import axios from "axios";
import { MainMenu } from "./layoutData";
import AuthButton from "../Buttons/authButton";
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
  const dispatch = useDispatch();
  const [selectedNav, setSelectedNav] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const defaultUser = { username: "Guest" };

  const handleLogout = async () => {
    setIsOpen(!isOpen);
    typeof window !== "undefined" && Cookies.remove("user");
    dispatch(setUser(defaultUser));

    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/user/logout`)
      .then()
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!user.jwt) {
      Router.push("/");
    }
  }, [user]);

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
    <>
      {/* Desktop Menu */}
      <section className="shadow-lg fixed w-full z-20 top-0 left-0 border-b border-gray-200 bg-[#fdeaff5d] !backdrop-blur-[12px] sm:!px-10 lg:!px-32">
        <nav className={`flex w-full items-center justify-between ${!user.onboarding && 'py-3'}`}>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Safe Haven Logo"
              width={155}
              height={45}
              className="mr-3 h-6 sm:h-9"
            />
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
          ) : (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                user?.Image ? (
                  <CloudinaryImage
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={user?.Image}
                    alt="User settings"
                    width="45"
                    height="45"
                    crop="scale"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="/avatar_icon.webp"
                    width={45}
                    height={45}
                    className="rounded-full object-cover"
                    alt="Logo"
                  />
                )
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.FirstName} {user?.LastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.Email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href="/agent/account">Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/create-ad">Create Ad</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/faq">Support</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="ml-auto mr-6 ">
          <ul className="font-semibold text-lg gap-6 flex">
            {MainMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.url}
                  className={`hover:underline ${
                    selectedNav === menu.url ? "!text-primary" : "text-gray-600"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </Navbar.Collapse>
      </Navbar>

      {/* Auth Modal Popup */}
      <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
