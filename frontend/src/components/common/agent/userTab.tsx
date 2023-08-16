import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import Cookies from "js-cookie";
import { setUser } from "@src/store/reducers/userReducer";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import AgentSidebar from "./agentSidebar";
import PropertyCard from "../properties/propertyCard";
import { PageLoader } from "../helpers/loader";
import ResendEmailVerificationButton from "../Buttons/emailVerificationButton";
import VerificationModal from "../accountVerification";
import { SingleProperty, UserProps } from "../helpers/interfaces";

interface IProps {
  user: UserProps;
  ads: SingleProperty;
}

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(" ");
};

const UserTab: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const [isVerification, setIsVerification] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [ads, setAds] = useState<SingleProperty[]>([]);
  const defaultUser = { username: "Guest" };

  const handleDelete = (propertyID: number) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/properties?user_id=${user.userId}&property_id=${propertyID}&jwt=${user.jwt}`
      )
      .then((res) => {
        if (res.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: res.data.error,
              open: true,
            })
          );
        } else {
          dispatch(
            setSnackbar({
              status: "success",
              message: " Property deleted",
              open: true,
            })
          );
        }
        setAds(ads.filter((ad) => ad.ID !== propertyID));
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackbar({
            status: "error",
            message:
              " There was an error deleting item, please contact support",
            open: true,
          })
        );
      });
  };

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

      axios
        .get(`${process.env.NEXT_PUBLIC_REST_API}/user?id=${user.userId}`)
        .then((res) => {
          setAds(res.data.properties);
        })
        .catch((err) => {
          console.error(err);
          typeof window !== "undefined" && Cookies.remove("user");
          dispatch(setUser(defaultUser));
          dispatch(
            setSnackbar({
              status: "error",
              message: "There was an error, please login again",
              open: true,
            })
          );
          setFetchedUser(undefined);
          Router.push("/");
        });
    }
  }, [user, ads]);

  useEffect(() => {
    fetchedUser?.Verification === "under_review"
      ? setIsVerification(true)
      : setIsVerification(false);
  }, [fetchedUser, isVerification]);

  return (
    <>
      {!fetchedUser ? (
        <PageLoader />
      ) : fetchedUser?.AccessLevel === 0 ? (
        <>
          <h1 className="font-bold text-center text-3xl mt-28 mb-4">
            Your account email is not yet veirifed!
          </h1>
          <h1 className="font-bold text-center text-xl mb-3">
            Please, check your inbox, promotions, or spam folder for the
            verification email we sent
          </h1>
          <p className="text-center text-xl mb-3">
            Or click the button below to resend verification email
          </p>
          <ResendEmailVerificationButton inline={false} />
        </>
      ) : (
        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 text-lg font-medium bg-purple-100 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 leading-5 text-gray-900 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  )
                }
              >
                Profile
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 leading-5 text-gray-900 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  )
                }
              >
                Reviews
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 leading-5 text-gray-900 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  )
                }
              >
                Favourites
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-4",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
                )}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4">
                  {/* agent sidebar */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <button
                        className={`inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2`}
                      >
                        Edit Profile
                      </button>

                      {fetchedUser?.Verification === "verified" ? (
                        <Link href="/create-ad">
                          <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                            Create Ad
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled={isVerification}
                          onClick={() =>
                            setVerificationModalOpen(!verificationModalOpen)
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50"
                        >
                          Verify Account
                        </button>
                      )}
                    </div>

                    <AgentSidebar
                      agent={fetchedUser}
                      totalCount={!ads ? 0 : ads.length}
                    />
                  </div>

                  {!ads ? (
                    <div className="flex flex-col col-span-2 justify-center items-center text-center">
                      <h3 className="font-medium text-lg mb-6">
                        {fetchedUser?.Verification === "verified"
                          ? "You do not have any ads. Create one"
                          : isVerification
                          ? "You have submitted your verification documents and they are under review. You will be able to create ad once your account is verified"
                          : "Please verify your account, then create new ads"}
                      </h3>
                      {fetchedUser?.Verification === "verified" ? (
                        <Link
                          href="/create-ad"
                          className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        >
                          Create Ad
                        </Link>
                      ) : (
                        <>
                          {isVerification ? (
                            <Link
                              href="/faq"
                              className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50"
                            >
                              Contact Support
                            </Link>
                          ) : (
                            <button
                              onClick={() =>
                                setVerificationModalOpen(!verificationModalOpen)
                              }
                              className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50"
                            >
                              Verify Account
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3 mb-8">
                      {ads.map((property: SingleProperty) => (
                        <PropertyCard
                          key={property.ID}
                          property={property}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-4",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
                )}
              >
                Reviews
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-4",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
                )}
              >
                Favourites
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <VerificationModal
            isOpen={verificationModalOpen}
            setIsOpen={setVerificationModalOpen}
            setIsVerification={setIsVerification}
          />
        </div>
      )}
    </>
  );
};

export default UserTab;
