import { FC, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface IProps {
  inline: boolean;
}

const ResendEmailVerificationButton: FC<IProps> = ({ inline }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  // const [countdown, setCountdown] = useState<number>(0);

  const handleResendEmailVerification = () => {
    setIsDisabled(true);
    // setCountdown(24 * 60 * 60);
    // const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    // Cookies.set("resendEmailCountdown", (24 * 60 * 60).toString(), {
    //   expires: new Date(expirationTime),
    // });
    Cookies.set("isDisabled", "true", { expires: 1 });
  };

  useEffect(() => {
    // const storedCountdown = Cookies.get("resendEmailCountdown");
    // if (storedCountdown) {
    //   const parsedCountdown = parseInt(storedCountdown);
    //   if (!isNaN(parsedCountdown)) {
    //     setCountdown(parsedCountdown);
    //   }
    // }

    const storedIsDisabled = Cookies.get("isDisabled");
    if (storedIsDisabled === "true") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  // useEffect(() => {
  //   const updateCountdown = setInterval(() => {
  //     setCountdown((prevCountdown) => prevCountdown - 1);
  //   }, 1000);

  //   return () => clearInterval(updateCountdown);
  // }, []);

  // useEffect(() => {
  //   const expirationTime = new Date().getTime() + countdown * 1000;
  //   Cookies.set("resendEmailCountdown", countdown.toString(), {
  //     expires: new Date(expirationTime),
  //   });
  //   Cookies.set("isDisabled", isDisabled ? "true" : "false", {
  //     expires: new Date(expirationTime),
  //   });

  //   if (countdown === 0) {
  //     setIsDisabled(false);
  //     Cookies.remove("resendEmailCountdown");
  //     Cookies.remove("isDisabled");
  //   }
  // }, [countdown, isDisabled]);

  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     const storedCountdown = Cookies.get("resendEmailCountdown");
  //     if (storedCountdown) {
  //       const parsedCountdown = parseInt(storedCountdown);
  //       if (!isNaN(parsedCountdown)) {
  //         setCountdown(parsedCountdown);
  //         setIsDisabled(true);
  //       }
  //     }
  //   }
  // }, []);

  // const hours = Math.floor(countdown / 3600);
  // const minutes = Math.floor((countdown % 3600) / 60);
  // const seconds = countdown % 60;
  // const countdownString = `${hours.toString().padStart(2, "0")}:${minutes
  //   .toString()
  //   .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div>
      <button
        onClick={handleResendEmailVerification}
        disabled={isDisabled}
        className="mx-auto py-2 px-6 transition duration-200 text-white disabled:text-gray-300 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center"
      >
        {isDisabled ? `Resend Email in 24hrs` : "Resend Email Verification"}
      </button>
    </div>
  );
};

export default ResendEmailVerificationButton;
