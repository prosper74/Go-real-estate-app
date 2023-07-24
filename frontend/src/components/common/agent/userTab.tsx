import { FC, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import AgentSidebar from "./agentSidebar";
import PropertyCard from "../properties/propertyCard";
import { PageLoader } from "../loader";
import { SingleProperty, UserProps } from "../interfaces";
import ResendEmailVerificationButton from "../Buttons/emailVerificationButton";
import VerificationModal from "../accountVerification";

interface IProps {
  user: UserProps;
}

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(" ");
};

const UserTab: FC = () => {
  const user = useSelector((state: IProps) => state.user);
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const [isVerification, setIsVerification] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [ads, setAds] = useState([]);

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
        });
    }
  }, [user]);

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

                      {user.Verification === "verified" ? (
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
                        {user.Verification === "verified"
                          ? "You do not have any ads. Create one"
                          : isVerification
                          ? "You have submitted your verification documents and they are under review. You will be able to create ad once your account is verified"
                          : "Please verify your account, then create new ads"}
                      </h3>
                      {user.Verification === "verified" ? (
                        <Link
                          href="/create-ad"
                          className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        >
                          Create Ad
                        </Link>
                      ) : (
                        <button
                          disabled={isVerification}
                          onClick={() =>
                            setVerificationModalOpen(!verificationModalOpen)
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50"
                        >
                          Verify Account
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3">
                      {ads.map((property: SingleProperty) => (
                        <PropertyCard
                          key={property.ID}
                          property={property}
                          showDescription={true}
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
