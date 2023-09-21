import { FC, useState } from "react";
import Image from "next/image";
import { HiPencilAlt } from "react-icons/hi";
import { timeSince } from "../helpers/dateFunction";
import { VerifiedIcon } from "../helpers/svgIcons";
import { UserProps } from "../helpers/interfaces";
import StatusImageModal from "../modals/updateImageModal";
// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";
import DeleteAccountModal from "../modals/deleteAccountModal";

interface IProps {
  agent?: UserProps;
  totalAds?: number;
  ActiveAds?: number;
  InactiveAds?: number;
  isDashboard?: boolean;
}

const AgentSidebar: FC<IProps> = ({
  agent,
  totalAds,
  ActiveAds,
  InactiveAds,
  isDashboard = false,
}) => {
  const [updateImageModal, setUpdateImageModal] = useState(false);
  const [deleteAccountModal, SetDeleteAccountModal] = useState(false);

  return (
    <div className="sticky top-20">
      <div className="py-5 px-4 rounded-xl shadow-md bg-white flex flex-col sm:flex-row lg:flex-col justify-evenly gap-1 sm:gap-12 lg:gap-1">
        <div className="relative">
          {agent?.Image ? (
            <CloudinaryImage
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
              publicId={agent?.Image}
              alt="user image"
              width="224"
              height="224"
              crop="scale"
              className="rounded-full object-cover shadow-lg"
            />
          ) : (
            <Image
              src={"/logoIcon.svg"}
              alt="logo"
              width={224}
              height={224}
              className="rounded-full object-cover shadow-lg"
            />
          )}

          {isDashboard && (
            <button
              className="absolute bottom-1/2 right-0 p-2 text-primary bg-gray-100 rounded-full shadow-lg"
              onClick={() => setUpdateImageModal(true)}
            >
              <HiPencilAlt size={25} />
            </button>
          )}
        </div>

        <div className="my-4 text-lg text-gray-700">
          <p className="my-2 capitalize">
            Name: {agent?.FirstName} {agent?.LastName}
          </p>
          {agent?.Phone && (
            <p className="my-2">
              Phone:{" "}
              <a href={`tel:+234${agent?.Phone.substring(1, 11)}`}>
                {agent?.Phone}
              </a>
            </p>
          )}

          <p className="my-2">
            Joined: {timeSince(new Date(agent!.CreatedAt))} ago
          </p>
          <p className="my-2">
            Status:{" "}
            {agent?.Verification === "verified" ? (
              <span>
                Verified
                <VerifiedIcon />
              </span>
            ) : (
              "Not verified"
            )}
          </p>
          <p className="my-2">Active Ads: {ActiveAds || 0}</p>
          {isDashboard && (
            <>
              <p className="my-2">Inactive Ads: {InactiveAds || 0}</p>
              <p className="my-2">Total Ads: {totalAds || 0}</p>
            </>
          )}

          {isDashboard && (
            <button
              className={`rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2`}
              onClick={() => SetDeleteAccountModal(true)}
            >
              Delete Account
            </button>
          )}
        </div>
      </div>

      <StatusImageModal
        modalOpen={updateImageModal}
        setModalOpen={setUpdateImageModal}
        profilePhoto={agent?.Image}
      />

      <DeleteAccountModal
        modalOpen={deleteAccountModal}
        setModalOpen={SetDeleteAccountModal}
      />
    </div>
  );
};

export default AgentSidebar;
