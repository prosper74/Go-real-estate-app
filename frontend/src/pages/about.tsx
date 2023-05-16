import Head from "next/head";
import Link from "next/link";
import { Timeline, Button } from "flowbite-react";
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
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              About Our <span className="font-extrabold">200,000+</span>{" "}
              companies worldwide
            </h2>
            <p className="mb-4 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti? Blanditiis
              accusamus commodi amet alias numquam qui nesciunt voluptatibus
              inventore fugiat optio Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam illum sint est id in dignissimos fuga,
              non corrupti? Blanditiis accusamus commodi amet alias numquam qui
              nesciunt voluptatibus inventore fugiat optio!
            </p>
            <p className="mb-4 font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. t alias
              numquam qui nesciunt voluptatibus inventore fugiat optio Lorem
              ipsum dolor.
            </p>
            <Link
              href="#"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
            >
              Learn more
              <ForwardArrowAlt />
            </Link>
          </div>
        </div>

        <div className="gap-16 items-center py-8 max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              We didn't reinvent the wheel
            </h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti? Blanditiis
              accusamus commodi amet alias numquam qui nesciunt voluptatibus
              inventore fugiat optio Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam illum sint est id in dignissimos fuga,
              non corrupti? Blanditiis accusamus commodi amet alias numquam qui
              nesciunt voluptatibus inventore fugiat optio!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              illum sint est id in dignissimos fuga, non corrupti optio!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>

        <div className="mb-32 mt-16">
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
        </div>
      </section>
    </>
  );
}
