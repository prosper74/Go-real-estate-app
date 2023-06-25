import Head from "next/head";
import Link from "next/link";
import { Timeline, Button } from "flowbite-react";
import { motion } from "framer-motion";
import {
  textAnimate,
  imageAnimate,
  imageAnimateTop,
  imageAnimateBottom,
} from "@src/components/common/variants";
import {
  FacebookIconFilled,
  ForwardArrowAlt,
  InstagramIcon,
  TwitterIcon,
} from "@src/components/common/svgIcons";

export default function VerifyUserEmail() {
  return (
    <>
      <Head>
        <title>Safe Haven | Verify User Email</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto mt-24 sm:!px-10 lg:!px-32">
        <div className="max-w-screen-xl">
          <motion.div
            className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ staggerChildren: 0.5 }}
          >
            <motion.h2
              className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
              variants={textAnimate}
            >
              Verifying <span className="font-extrabold">Your Email</span>{" "}
            </motion.h2>
            <motion.p className="mb-4 font-light" variants={textAnimate}>
              nesciunt voluptatibus inventore fugiat optio!
            </motion.p>
            <motion.p className="mb-4 font-medium" variants={textAnimate}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. t alias
              numquam qui nesciunt voluptatibus inventore fugiat optio Lorem
              ipsum dolor.
            </motion.p>
            <motion.span variants={imageAnimate}>
              <Link
                href="#"
                className="bg-white py-2 px-6 rounded-lg shadow-sm inline-flex items-center font-medium text-primary-600 hover:text-primary"
              >
                Learn more
                <ForwardArrowAlt />
              </Link>
            </motion.span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
