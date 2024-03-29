import { FC, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { ForwardArrow, BackArrowIcon } from "@src/components/common/helpers/svgIcons";

interface IProps {
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  steps: any;
}

const schema = z.object({
  email: z.string().email().nonempty({ message: "Invalid email" }),
});

const ForgotPassword: FC<IProps> = ({ setIsOpen, steps, setSelectedStep }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigateLogin = () => {
    const login = steps.find(
      (step: { label: string }) => step.label === "Login"
    );
    setSelectedStep(steps.indexOf(login));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/forgot-password`,
        {
          email: data.email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setLoading(false);

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
              message: ` Email sent, please check your inbox for instructions to reset your password`,
              open: true,
            })
          );
          setIsOpen(false);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setSnackbar({
            status: "error",
            message: ` There was an error, please contact support`,
            open: true,
          })
        );
        setLoading(false);
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h3 className="text-2xl font-bold text-center mt-6">
            Forgot Password?
          </h3>
          <p className="text-base font-normal text-center px-4">
            Kindly input your registered email address, and we will send an
            email with instructions on how to reset your password
          </p>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Local Login */}
            <div className="px-5 py-4">
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className={`font-semibold text-base pb-1 block ${
                      errors.email ? "text-red-500" : "text - gray - 600"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    type="text"
                    {...register("email")}
                    className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.email &&
                      "border-red-500 text-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {/* @ts-ignore */}
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className={`transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
                    loading
                      ? "hover:bg-purple-300 text-gray-300"
                      : "hover:bg-purple-700 text-white"
                  }`}
                >
                  <span className="mr-2">Submit</span>
                  {loading ? (
                    <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                  ) : (
                    <ForwardArrow />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Login Instead  */}
          <div className="py-1">
            <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={navigateLogin}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-base rounded-lg text-gray-500hover:text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center"
                >
                  <BackArrowIcon dimensions="w-5 h-5" />
                  <span className="inline-block ml-1">Login instead</span>
                </button>
              </div>
              <button
                type="button"
                className="inline-flex justify-center items-center  text-base font-medium text-gray-500 border-transparent rounded-md hover:bg-gray-200"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
