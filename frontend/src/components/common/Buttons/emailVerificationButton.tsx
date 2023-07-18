import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ResendEmailVerificationButton: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState("false");
  const [countdown, setCountdown] = useState<number>(0);
  const [storedCountdownString, setStoredCountdownString] = useState("0");

  const handleResendEmailVerification = () => {
    setIsDisabled("true");
    setCountdown(24 * 60 * 60);
    Cookies.set("resendEmailCountdown", (24 * 60 * 60).toString(), {
      expires: 1,
    });
    Cookies.set("isDisabled", "true", { expires: 1 });
  };

  useEffect(() => {
    const storedCountdown = Cookies.get("resendEmailCountdown");
    if (storedCountdown) {
      const parsedCountdown = parseInt(storedCountdown);
      if (!isNaN(parsedCountdown)) {
        setCountdown(parsedCountdown);
      }
    }

    const storedIsDisabled = Cookies.get("isDisabled");
    if (storedIsDisabled === "true") {
      setIsDisabled("true");
    }
  }, []);

  useEffect(() => {
    const updateCountdown = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(updateCountdown);
  }, []);

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  const countdownString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  Cookies.set("countdownString", countdownString, { expires: 1 });

  console.log("storeedIsDisable:", isDisabled);
  console.log("count down:", countdown);
  console.log("count down string:", Cookies.get("countdownString"));

  return (
    <div>
      <button
        onClick={handleResendEmailVerification}
        disabled={isDisabled === "true"}
      >
        {isDisabled === "true"
          ? `Resend Email Verification in ${Cookies.get("countdownString")}`
          : "Resend Email Verification"}
      </button>
    </div>
  );
};

export default ResendEmailVerificationButton;
