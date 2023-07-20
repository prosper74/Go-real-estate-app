import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { UserProps } from "../interfaces";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  user?: UserProps;
  inline: boolean;
}

const ResendEmailVerificationButton: FC<IProps> = ({ inline }) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResendEmailVerification = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/resend-email`,
        {
          user_id: user?.userId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: response.data.error,
              open: true,
            })
          );
          setLoading(false);
        } else {
          setIsDisabled(true);
          Cookies.set("isDisabled", "true", { expires: 1 });
          setLoading(false);
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Email Sent, please check your inbox to verify your email`,
              open: true,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setSnackbar({
            status: "error",
            message: "An error occured, please contact support",
            open: true,
          })
        );
        setLoading(false);
      });
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
        disabled={isDisabled || loading}
        className={`${
          inline
            ? "underline text-sky-700"
            : "mx-auto py-2 px-6 transition duration-200 text-white bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center"
        } disabled:text-gray-300`}
      >
        {loading ? (
          <span className="inline-flex justify-center items-center">
            Sending{" "}
            <div className="border-b-2 border-purple-300 rounded-full animate-spin w-5 h-5 ml-3" />
          </span>
        ) : (
          <>
            {isDisabled ? `Resend Email in 24hrs` : "Resend Email Verification"}
          </>
        )}
      </button>
    </div>
  );
};

export default ResendEmailVerificationButton;
