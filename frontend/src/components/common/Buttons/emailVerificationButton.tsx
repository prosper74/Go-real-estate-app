import { FC, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface IProps {
  inline: boolean;
}

const ResendEmailVerificationButton: FC<IProps> = ({ inline }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleResendEmailVerification = () => {
    setIsDisabled(true);
    Cookies.set("isDisabled", "true", { expires: 1 });
  };

  useEffect(() => {
    const storedIsDisabled = Cookies.get("isDisabled");
    if (storedIsDisabled === "true") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  return (
    <div>
      <button
        onClick={handleResendEmailVerification}
        disabled={isDisabled}
        className={`${
          inline
            ? "underline text-sky-700"
            : "mx-auto py-2 px-6 transition duration-200 text-white bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center"
        } disabled:text-gray-300`}
      >
        {isDisabled ? `Resend Email in 24hrs` : "Resend Email Verification"}
      </button>
    </div>
  );
};

export default ResendEmailVerificationButton;
