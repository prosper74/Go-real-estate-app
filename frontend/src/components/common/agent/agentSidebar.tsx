import { FC } from 'react';
import { UserProps } from '../interfaces';
import { timeSince } from '../dateFunction';
import { VerifiedIcon } from '../svgIcons';

interface IProps {
  agent: UserProps;
  totalCount?: number;
}

const AgentSidebar: FC<IProps> = ({ agent, totalCount }) => {
  return (
    <div className="sticky top-20">
      <div className="py-2 px-4 rounded-xl shadow-md bg-white">
        <img
          src={agent.Image ? agent.Image : '/logoIcon.svg'}
          alt="agent image"
          className="w-40 h-40 mt-6 rounded-full object-cover"
        />
        <div className="my-4 text-lg text-gray-700">
          <p className="my-2 capitalize">Name: {agent.FirstName} {agent.LastName}</p>
          <p className="my-2">
            Number: <a href={`tel:+234${agent.Phone}`}>+234 {agent.Phone}</a>
          </p>
          <p className="my-2">
            Joined: {timeSince(new Date(agent.CreatedAt))} ago
          </p>
          <p className="my-2">
            Status:{' '}
            {agent.Verified ? (
              <span>
                Verified
                <VerifiedIcon />
              </span>
            ) : (
              'Not verified'
            )}
          </p>
          <p className="my-2">Active Ads: {totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;
