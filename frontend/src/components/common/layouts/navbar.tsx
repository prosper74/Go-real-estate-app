import { useState, useEffect } from "react";
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
import { setUser } from "@src/store/reducers/userReducer";
import { UserProps } from "../helpers/interfaces";
// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";

interface IProps {
  user: UserProps;
}

export default function Header() {
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
      setSelectedNav("/buy");
    } else if (window.location.href.indexOf("/rent") > -1) {
      setSelectedNav("/rent");
    } else if (window.location.href.indexOf("/shortlet") > -1) {
      setSelectedNav("/shortlet");
    } else {
      setSelectedNav("");
    }
  });

  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
        className="shadow-lg fixed w-full z-20 top-0 left-0 border-b border-gray-200 bg-[#fdeaff5d] !backdrop-blur-[12px] sm:!px-10 lg:!px-32"
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            width={155}
            height={45}
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
        </Link>
        <div className="flex md:order-2">
          {!user.jwt && !user.onboarding ? (
            <AuthButton
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              buttonText="Get Started"
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
}
