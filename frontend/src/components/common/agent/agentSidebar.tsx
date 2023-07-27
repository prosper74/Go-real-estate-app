import { FC } from "react";
import { UserProps } from "../interfaces";
import { timeSince } from "../dateFunction";
import { VerifiedIcon } from "../svgIcons";

interface IProps {
  agent: UserProps;
  totalCount?: number;
}

const AgentSidebar: FC<IProps> = ({ agent, totalCount }) => {
  return (
    <div className="sticky top-20">
      <div className="py-2 px-4 rounded-xl shadow-md bg-white flex flex-col sm:flex-row lg:flex-col items-center justify-evenly gap-1 sm:gap-12 lg:gap-1">
        <img
          src={agent.Image ? agent.Image : "/logoIcon.svg"}
          alt="agent image"
          className="w-56 h-56 mt-6 rounded-full object-cover"
        />
        <div className="my-4 text-lg text-gray-700">
          <p className="my-2 capitalize">
            Name: {agent.FirstName} {agent.LastName}
          </p>
          {agent.Phone && (
            <p className="my-2">
              Phone:{" "}
              <a href={`tel:+234${agent.Phone.substring(1, 11)}`}>
                {agent.Phone}
              </a>
            </p>
          )}

          <p className="my-2">
            Joined: {timeSince(new Date(agent.CreatedAt))} ago
          </p>
          <p className="my-2">
            Status:{" "}
            {agent.Verification === "verified" ? (
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
    </div>
  );
};

export default AgentSidebar;
