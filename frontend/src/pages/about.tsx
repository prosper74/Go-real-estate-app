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
import { ForwardArrowAlt } from "@src/components/common/svgIcons";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Safe Haven | About Us</title>
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
              About Our <span className="font-extrabold">200,000+</span>{" "}
              companies worldwide
            </motion.h2>
            <motion.p className="mb-4 font-light" variants={textAnimate}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti? Blanditiis
              accusamus commodi amet alias numquam qui nesciunt voluptatibus
              inventore fugiat optio Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam illum sint est id in dignissimos fuga,
              non corrupti? Blanditiis accusamus commodi amet alias numquam qui
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

        <div className="gap-16 items-center py-4 max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
          <motion.div
            className="font-light text-gray-500 sm:text-lg dark:text-gray-400"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ staggerChildren: 0.5 }}
          >
            <motion.h2
              className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
              variants={textAnimate}
            >
              We didn't reinvent the wheel
            </motion.h2>
            <motion.p className="mb-4" variants={textAnimate}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti? Blanditiis
              accusamus commodi amet alias numquam qui nesciunt voluptatibus
              inventore fugiat optio Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam illum sint est id in dignissimos fuga,
              non corrupti? Blanditiis accusamus commodi amet alias numquam qui
              nesciunt voluptatibus inventore fugiat optio!
            </motion.p>
            <motion.p variants={textAnimate}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti optio!
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4 mt-8"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <motion.img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
              variants={imageAnimateTop}
            />
            <motion.img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
              variants={imageAnimateBottom}
            />
          </motion.div>
        </div>

        <motion.div
          className="mb-32 mt-6"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.3 }}
          variants={textAnimate}
        >
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Milestone
          </h2>
          <Timeline>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>February 2022</Timeline.Time>
                <Timeline.Title>
                  Application UI code in Tailwind CSS
                </Timeline.Title>
                <Timeline.Body>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Deleniti nulla nisi, tempore exercitationem nobis cupiditate
                  earum aspernatur maiores corporis? Omnis, repudiandae
                  perferendis? Ipsam fuga tempora obcaecati in incidunt facilis
                  nemo!
                </Timeline.Body>
                <Button color="gray" className="hover:text-primary">
                  Learn More
                  <ForwardArrowAlt />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>March 2022</Timeline.Time>
                <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                <Timeline.Body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi magnam vitae, facilis fugit odio eaque eum veniam
                  accusamus. Sunt numquam corporis fugiat ullam, autem
                  consequatur ratione adipisci dolore optio praesentium!
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>April 2022</Timeline.Time>
                <Timeline.Title>
                  Secured and Scalable Backend with Go
                </Timeline.Title>
                <Timeline.Body>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  labore ipsum harum veritatis tempora, nulla quidem.
                  Perferendis, maiores!
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </motion.div>
      </section>
    </>
  );
}
