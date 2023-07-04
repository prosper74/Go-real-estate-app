import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { MainMenu } from "./layoutData";
import { UserProps } from "../interfaces";
import AuthButton from "../Buttons/authButton";
import AuthPortal from "@src/components/auth";
import { setUser } from "@src/store/reducers/userReducer";
import Cookies from "js-cookie";
import axios from "axios";

interface IProps {
  user: UserProps;
}

export default function Header() {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const [selectedNav, setSelectedNav] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const defaultUser = { username: "Guest" };

  const handleLogout = async () => {
    setIsOpen(!isOpen);
    typeof window !== "undefined" && Cookies.remove("user");
    dispatch(setUser(defaultUser));
    setFetchedUser(undefined)

    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/user/logout`)
      .then()
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user.userId) {
      axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/auth/dashboard?id=${user.userId}`
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setFetchedUser(res.data.user);
        }
      })
      .catch((error) => console.error(error));
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
            width={150}
            height={40}
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
                <Avatar
                  alt="User settings"
                  img="/avatar_icon.webp"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{fetchedUser?.FirstName} {fetchedUser?.LastName}</span>
                <span className="block truncate text-sm font-medium">
                {fetchedUser?.Email}
                </span>
              </Dropdown.Header>
              {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
              <Dropdown.Item><Link href="/create-ad">Dashboard</Link></Dropdown.Item>
              <Dropdown.Item><Link href="/create-ad">Create Ad</Link></Dropdown.Item>
              <Dropdown.Item>Support</Dropdown.Item>
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
