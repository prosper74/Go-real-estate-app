import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
} from "@src/components/common/svgIcons";

const schema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,45}$/,
        "Min 8 characters, max 45 characters, must contain uppercase, lowercase, number and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export default function ResetPassword({ queryParams }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userid, token } = queryParams;

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
          password: data.password,
          user_id: userid,
          jwt: token,
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
          router.push("/");
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

  // useEffect(() => {
  //   if (!userid && !token) {
  //     dispatch(
  //       setSnackbar({
  //         status: "error",
  //         message: ` No user id or token found. Use the Forgot password form`,
  //         open: true,
  //       })
  //     );
  //     router.push("/");
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Safe Haven | Verify User Email</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto mt-24 sm:!px-10 lg:!px-32">
        <div className="flex flex-col justify-center">
          <div className="p-4 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h3 className="text-2xl font-bold text-center mt-6">
              Reset Your Password?
            </h3>
            <p className="text-base font-normal text-center px-4">
              Kindly enter your new password and confirm it
            </p>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-8">
              {/* Local Login */}
              <div className="px-5 py-4">
                <form>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className={`font-semibold text-base pb-1 block ${
                        errors.password ? "text-red-500" : "text - gray - 600"
                      }`}
                    >
                      New Password
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

                  <div className="mb-5">
                    <label
                      htmlFor="confirmPassword"
                      className={`font-semibold text-base pb-1 block ${
                        errors.confirmPassword ? "text-red-500" : "text - gray - 600"
                      }`}
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                          errors.confirmPassword &&
                          "border-red-500 text-red-500 focus:outline-red-500"
                        }`}
                      />
                      <div
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 pt-3 transition duration-200"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon width="26" height="26" fill="#9333EA" />
                        ) : (
                          <EyeIcon width="26" height="26" fill="#9333EA" />
                        )}
                      </div>
                    </div>
                    {errors.confirmPassword?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {/* @ts-ignore */}
                        {errors.confirmPassword?.message}
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
                    <span className="mr-2">Change Password</span>
                    {loading ? (
                      <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                    ) : (
                      <ForwardArrow />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      queryParams: context.query,
    },
  };
}
