// @ts-nocheck
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { UserProps } from "../helpers/interfaces";
import Rating from "../helpers/starRating";
import { ForwardArrow } from "../helpers/svgIcons";
import AuthPortal from "@src/components/auth";
import AuthButton from "../Buttons/authButton";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  user?: UserProps;
  propertyID?: number;
  setReviews?: any;
}

const schema = z.object({
  review: z
    .string()
    .min(5, { message: "review must be at at least 5 characters" })
    .max(400, { message: "review must be max 400 characters" }),
});

export default function Review({ propertyID, setReviews }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const ratingRef = useRef(null);

  const {
    register,
    reset,
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
        `${process.env.NEXT_PUBLIC_REST_API}/user/create-review`,
        {
          review: data.review,
          rating,
          property_id: propertyID,
          user_id: user?.ID,
          jwt: user?.jwt,
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
              message: ` Reviews added`,
              open: true,
            })
          );
          // set reviews to the new reviews from server
          setReviews(res.data.reviews);
          reset();
          setRating(0);
          setTempRating(0);
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

  return (
    <section>
      {!user?.jwt && !user?.onboarding ? (
        <>
          <p>Please login to leave a review</p>
          <AuthButton
            isOpen={isAuthModalOpen}
            setIsOpen={setIsAuthModalOpen}
            buttonText="Login"
          />
        </>
      ) : (
        <AnimatePresence>
          <motion.div transition={{ layout: { duration: 1.5 } }} layout>
            <motion.button
              layout
              initial={{
                y: 150,
                x: 0,
                opacity: 0,
              }}
              animate={{
                y: 0,
                x: 0,
                opacity: 1,
              }}
              className={`rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "Collapse Add Review" : "Add Review"}
            </motion.button>

            {isCollapsed && (
              <>
                <motion.h3
                  layout
                  transition={{ layout: { duration: 1.5 } }}
                  initial={{
                    y: 150,
                    x: 0,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="font-bold text-stone-950 text-lg"
                >
                  {user.FirstName + " " + user.LastName}
                </motion.h3>

                <motion.div layout className="flex items-center">
                  <motion.button
                    layout
                    initial={{
                      y: 150,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="flex items-center"
                    ref={ratingRef}
                    onClick={() => setRating(tempRating)}
                    onMouseLeave={() => {
                      if (tempRating > rating) {
                        setTempRating(rating);
                      }
                    }}
                    onMouseMove={(e) => {
                      const hoverRating =
                        ((ratingRef.current.getBoundingClientRect().left -
                          e.clientX) /
                          ratingRef.current.getBoundingClientRect().width) *
                        -5;

                      setTempRating(Math.round(hoverRating * 2) / 2);
                    }}
                  >
                    <Rating
                      number={rating > tempRating ? rating : tempRating}
                    />
                  </motion.button>

                  <motion.p
                    layout
                    initial={{
                      y: 150,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    {tempRating || "Enter star rating"}
                  </motion.p>
                </motion.div>

                <motion.form layout="position">
                  <motion.textarea
                    layout
                    transition={{ layout: { duration: 1.5 } }}
                    initial={{
                      y: 150,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    {...register("review")}
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Your Message"
                    className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.review &&
                      "border-red-500 text-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.review?.message && (
                    <motion.p
                      layout
                      initial={{
                        y: 150,
                        x: 0,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        x: 0,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.review?.message}
                    </motion.p>
                  )}

                  <motion.button
                    layout
                    initial={{
                      y: 150,
                      x: 0,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    type="button"
                    onClick={onSubmit}
                    disabled={loading || !rating}
                    className={`mt-2 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
                      loading
                        ? "hover:bg-purple-300 text-gray-300"
                        : "hover:bg-purple-700 text-white"
                    }`}
                  >
                    <motion.span
                      layout
                      initial={{
                        y: 150,
                        x: 0,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        x: 0,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="mr-2"
                    >
                      Submit Review
                    </motion.span>
                    {loading ? (
                      <motion.div
                        layout
                        className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "
                      ></motion.div>
                    ) : (
                      <ForwardArrow />
                    )}
                  </motion.button>
                </motion.form>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Auth Modal Popup */}
      <AuthPortal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </section>
  );
}
