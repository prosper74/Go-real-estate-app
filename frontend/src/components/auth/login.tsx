import { FC, useState } from "react";
// import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "@src/store/reducers/userReducer";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import {
  EyeIcon,
  EyeSlashIcon,
  ForwardArrow,
  GoogleIcon,
  FacebookIcon,
  PadlockOpenIcon,
  HelpIcon,
  UserAddIcon,
} from "@src/components/common/helpers/svgIcons";

interface IProps {
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  steps: any;
}

const schema = z.object({
  email: z.string().email().nonempty({ message: "Invalid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be atleast 8 characters, and must contain uppercase, lowercase, number and special character"
    ),
});

const Login: FC<IProps> = ({ setIsOpen, steps, setSelectedStep }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateForgotPassword = () => {
    const forgotPassword = steps.find(
      (step: { label: string }) => step.label === "Forgot Password"
    );
    setSelectedStep(steps.indexOf(forgotPassword));
  };

  const navigateSignup = () => {
    const signUp = steps.find(
      (step: { label: string }) => step.label === "Sign Up"
    );
    setSelectedStep(steps.indexOf(signUp));
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
        `${process.env.NEXT_PUBLIC_REST_API}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response);
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
          dispatch(
            setUser({
              ID: response.data.user.ID,
              FirstName: response.data.user.FirstName,
              LastName: response.data.user.LastName,
              Email: response.data.user.Email,
              Phone: response.data.user.Phone,
              Image: response.data.user.Image,
              jwt: response.data.user.Token,
              onboarding: true,
            })
          );
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Welcome Back, ${response.data.user.FirstName}`,
              open: true,
            })
          );
          setLoading(false);
          setIsOpen(false);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setSnackbar({ status: "error", message: error, open: true }));
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
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className={`font-semibold text-base pb-1 block ${
                      errors.password ? "text-red-500" : "text - gray - 600"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      autoComplete="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.password &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 pt-3 transition duration-200"
                    >
                      {showPassword ? (
                        <EyeSlashIcon width="26" height="26" fill="#9333EA" />
                      ) : (
                        <EyeIcon width="26" height="26" fill="#9333EA" />
                      )}
                    </div>
                  </div>
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {/* @ts-ignore */}
                      {errors.password?.message}
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
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Loading</span>
                      <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 " />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Login</span>
                      <ForwardArrow />
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Social Logins */}
            <div className="p-2">
              <div className="grid grid-cols-2 gap-4">
                {/* <Link
                  href={`#`}
                > */}
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                  >
                    <GoogleIcon dimensions="w-6 h-6" />
                    Google
                  </button>
                {/* </Link> */}
                {/* <Link
                  href={`#!`}
                > */}
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                  >
                    <FacebookIcon dimensions="w-6 h-6" />
                    Facebook
                  </button>
                {/* </Link> */}
              </div>
            </div>

            {/* Forgot Password and Help */}
            <div className="py-1">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button
                    onClick={navigateForgotPassword}
                    className="transition duration-200 mx-5 px-5 py-4 font-normal text-base rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center"
                  >
                    <PadlockOpenIcon />
                    <span className="ml-1">Forgot Password</span>
                  </button>
                </div>

                <div className="text-center sm:text-right whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-base rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <HelpIcon />
                    <span className="inline-block ml-1">Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Create New Account  */}
          <div className="py-1">
            <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={navigateSignup}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-base rounded-lg text-gray-500hover:text-white hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center"
                >
                  <UserAddIcon width="22" height="22" />
                  <span className="inline-block ml-1">Create Account</span>
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

export default Login;
