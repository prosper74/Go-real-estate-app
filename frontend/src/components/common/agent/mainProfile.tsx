import { FC } from "react";
import Link from "next/link";
import AgentSidebar from "./agentSidebar";
import PropertyCard from "../properties/propertyCard";
import { SingleProperty, UserProps } from "../helpers/interfaces";

interface IProps {
  fetchedUser?: UserProps;
  ads?: SingleProperty[];
  isVerification: boolean;
  verificationModalOpen: boolean;
  setVerificationModalOpen: (open: boolean) => void;
  handleDelete?: any;
  handleStatusUpdate?: any;
}

const MainProfile: FC<IProps> = ({
  fetchedUser,
  ads,
  isVerification,
  verificationModalOpen,
  setVerificationModalOpen,
  handleDelete,
  handleStatusUpdate
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 sm:gap-4">
      {/* agent sidebar */}
      <div className="mb-6 sm:mb-0">
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
              onClick={() => setVerificationModalOpen(!verificationModalOpen)}
              className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              Verify Account
            </button>
          )}
        </div>

        <AgentSidebar agent={fetchedUser} totalCount={!ads ? 0 : ads.length} />
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
        <div className="grid gap-4 col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-3 mb-8">
          {ads.map((property: SingleProperty) => (
            <span key={property.ID}>
              <PropertyCard
                property={property}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
                isUserDashboard={true}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainProfile;
