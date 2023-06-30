import { FC, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import {
  EyeIcon,
  EyeSlashIcon,
  ForwardArrow,
  BackArrowIcon,
  GoogleIcon,
  FacebookIcon,
} from "@src/components/common/svgIcons";
import { TemplateData } from "../common/interfaces";

interface IProps {
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  steps: any;
  templateData: TemplateData;
}

const schema = z.object({
  first_name: z
    .string()
    .min(3, { message: "Name must be at at least 3 characters" })
    .max(30, { message: "Maximun 30 characters" }),
  last_name: z
    .string()
    .min(3, { message: "Name must be at at least 3 characters" })
    .max(30, { message: "Maximun 30 characters" }),
  email: z.string().email().nonempty({ message: "Invalid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,45}$/,
      "Min 8 characters, max 45 characters, must contain uppercase, lowercase, number and special character"
    ),
  csrf_token: z.string(),
});

const Signup: FC<IProps> = ({ setIsOpen, steps, setSelectedStep }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleBackward = () => {
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
        `${process.env.NEXT_PUBLIC_REST_API}/signup`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          csrf_token: token,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("Resp: ", response.data.error);

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
            setSnackbar({
              status: "success",
              message: ` Account created, please check your inbox to verify your email`,
              open: true,
            })
          );
          const complete = steps.find(
            (step: { label: string }) => step.label === "Complete"
          );
          setSelectedStep(steps.indexOf(complete));
          setLoading(false);
        }
      })
      .catch((error) => {
        // const { message } = error.response.data.message[0].messages[0];
        console.error(error);
        dispatch(
          setSnackbar({
            status: "error",
            message: "An error occured",
            open: true,
          })
        );
        setLoading(false);
      });
  });

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/token-and-user-id`)
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center overflow-y-auto">
        <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            {/* Local Login */}
            <div className="px-5 py-4">
              <form>
                <div className="mb-3 flex flex-wrap gap-3.5">
                  <span className="w-full md:w-[48%]">
                    <label
                      htmlFor="first_name"
                      className={`font-semibold text-base pb-1 block ${
                        errors.first_name ? "text-red-500" : "text - gray - 600"
                      }`}
                    >
                      First name
                    </label>
                    <input
                      id="first_name"
                      autoComplete="first_name"
                      type="text"
                      {...register("first_name")}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.name &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                    />
                    {errors.first_name?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {/* @ts-ignore */}
                        {errors.first_name?.message}
                      </p>
                    )}
                  </span>

                  <span className="w-full md:w-[48%]">
                    <label
                      htmlFor="last_name"
                      className={`font-semibold text-base pb-1 block ${
                        errors.last_name ? "text-red-500" : "text - gray - 600"
                      }`}
                    >
                      Last name
                    </label>
                    <input
                      id="last_name"
                      autoComplete="last_name"
                      type="text"
                      {...register("last_name")}
                      className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.last_name &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                    />
                    {errors.last_name?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {/* @ts-ignore */}
                        {errors.last_name?.message}
                      </p>
                    )}
                  </span>
                </div>
                <div className="mb-3">
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

                <input
                  type="hidden"
                  {...register("csrf_token")}
                  value={token}
                />

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
                      <span className="mr-2">Submitting</span>
                      <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 " />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Sign up</span>
                      <ForwardArrow />
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Social Logins */}
            <div className="p-2">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`${process.env.NEXT_PUBLIC_REST_API}/connect/google`}
                >
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                  >
                    <GoogleIcon dimensions="w-6 h-6" />
                    Google
                  </button>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_REST_API}/connect/facebook`}
                >
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-700 w-full py-2.5 rounded-lg text-base shadow-sm hover:shadow-md font-normal text-center flex items-center justify-center"
                  >
                    <FacebookIcon dimensions="w-6 h-6" />
                    Facebook
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Login Instead  */}
          <div className="py-1">
            <div className="grid grid-cols-2 xs:gap-4 md:gap-32">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={handleBackward}
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

export default Signup;
