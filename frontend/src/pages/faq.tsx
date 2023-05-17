import Head from "next/head";
import Link from "next/link";
import { Accordion } from "flowbite-react";
import { motion } from "framer-motion";
import { textAnimate } from "@src/components/common/variants";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Safe Haven | FAQ</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="px-4 mx-auto my-24 sm:!px-10 lg:!px-32">
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
              You will Find Help in our{" "}
              <span className="font-extrabold">Frequently Asked Questions</span>
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
          </motion.div>

          <motion.div
            className="max-w-screen-lg text-gray-500 sm:text-lg mt-16 mb-24"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.3 }}
            variants={textAnimate}
          >
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>Buy Properties?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem cumque ex inventore nostrum, ratione quas ipsum,
                    porro perspiciatis accusamus non enim? Possimus veniam
                    minima, optio suscipit tempora laborum labore beatae!
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Check out this guide to learn how to
                    <Link
                      href="/buy"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      get started
                    </Link>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Rent Properties?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Pariatur, minima sed! Dolor, quam adipisci, quia autem
                    debitis praesentium labore cumque excepturi perferendis,
                    impedit aspernatur est nemo qui voluptatum reiciendis
                    reprehenderit.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Check out the
                    <Link
                      href="/rent"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Properties
                    </Link>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit!
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>
                  Why you need to Shortlet sometimes?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
                    perspiciatis enim, dignissimos ad, consequatur asperiores et
                    labore iure sit, exercitationem nam ullam atque repudiandae
                    itaque eaque similique? Quod, voluptatum aut.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    However, Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Hic eligendi possimus unde dolorem saepe deleniti odio
                    cupiditate.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Learn more about these properties:
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
}
