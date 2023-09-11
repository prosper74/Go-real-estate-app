import { FC, useState } from "react";
import Image from "next/image";
import { HiPencilAlt } from "react-icons/hi";
import { timeSince } from "../helpers/dateFunction";
import { VerifiedIcon } from "../helpers/svgIcons";
import { UserProps } from "../helpers/interfaces";
import StatusImageModal from "../modals/updateImageModal";

interface IProps {
  agent?: UserProps;
  totalCount?: number;
  isDashboard?: boolean;
}

const AgentSidebar: FC<IProps> = ({
  agent,
  totalCount,
  isDashboard = false,
}) => {
  const [updateImageModal, setUpdateImageModal] = useState(false);

  return (
    <div className="sticky top-20">
      <div className="py-2 px-4 rounded-xl shadow-md bg-white flex flex-col sm:flex-row lg:flex-col items-center justify-evenly gap-1 sm:gap-12 lg:gap-1">
        <div className="relative">
          <Image
            src={agent?.Image ? agent?.Image : "/logoIcon.svg"}
            alt="User avatar"
            width={224}
            height={224}
            className="w-56 h-56 mt-6 rounded-full object-cover"
          />

          {isDashboard && (
            <button
              className="absolute bottom-0 right-0 p-2 text-primary bg-gray-100 rounded-full shadow-lg"
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
          <p className="my-2">Active Ads: {totalCount}</p>
        </div>
      </div>

      <StatusImageModal modalOpen={updateImageModal} setModalOpen={setUpdateImageModal} />
    </div>
  );
};

export default AgentSidebar;
