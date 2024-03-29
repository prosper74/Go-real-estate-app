import { FC, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import Cookies from "js-cookie";
import crypto from "crypto";
import { setUser } from "@src/store/reducers/userReducer";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import MainProfile from "./mainProfile";
import { PageLoader } from "../helpers/loader";
import ResendEmailVerificationButton from "../Buttons/emailVerificationButton";
import VerificationModal from "../accountVerification";
import { SingleProperty, UserProps } from "../helpers/interfaces";
import UserFavourites from "./userFavourites";
import UserReviews from "../reviews/userReviews";

interface IProps {
  user?: UserProps;
  ads?: SingleProperty;
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string | undefined) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(" ");
};

const UserTab: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const defaultUser = { username: "Guest" };
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const dispatch = useDispatch();
  const [isVerification, setIsVerification] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [ads, setAds] = useState<SingleProperty[]>([]);

  const handleDelete = (propertyID: number, images: string[]) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/properties?user_id=${user?.ID}&property_id=${propertyID}&jwt=${user?.jwt}`
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
          // delete images from cloudinary
          images.map((image) => {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
            const timestamp = new Date().getTime();
            const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
            const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET;
            const signature = generateSHA1(generateSignature(image, apiSecret));
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

            axios
              .post(url, {
                public_id: image,
                signature: signature,
                api_key: apiKey,
                timestamp: timestamp,
              })
              .then(() => {
                dispatch(
                  setSnackbar({
                    status: "success",
                    message: ` Property deleted`,
                    open: true,
                  })
                );
              })
              .catch(() => {
                dispatch(
                  setSnackbar({
                    status: "error",
                    message: ` Unable to remove property images. Please contact support`,
                    open: true,
                  })
                );
              });
          });
        }
        setAds(res.data.userProperties);
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

  const handleStatusUpdate = (propertyID: number, propertyStatus: string) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-property-status?user_id=${user?.ID}&property_id=${propertyID}&property_status=${propertyStatus}&jwt=${user?.jwt}`
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
              message: ` Property status updated`,
              open: true,
            })
          );
        }
        setAds(res.data.userProperties);
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackbar({
            status: "error",
            message:
              " There was an error updating the property item, please contact support",
            open: true,
          })
        );
      });
  };

  useEffect(() => {
    if (user?.ID) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REST_API}/auth/dashboard?id=${user?.ID}`
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
        .get(`${process.env.NEXT_PUBLIC_REST_API}/user?id=${user.ID}`)
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
                <MainProfile
                  fetchedUser={fetchedUser}
                  setFetchedUser={setFetchedUser}
                  ads={ads}
                  isVerification={isVerification}
                  verificationModalOpen={verificationModalOpen}
                  setVerificationModalOpen={setVerificationModalOpen}
                  handleDelete={handleDelete}
                  handleStatusUpdate={handleStatusUpdate}
                />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-4",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
                )}
              >
                <UserReviews />
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white rounded-xl p-4",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
                )}
              >
                <UserFavourites />
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
