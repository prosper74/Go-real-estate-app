import Head from "next/head";
import Link from "next/link";
import { Card } from "flowbite-react";
import { LocationIcon } from "@src/components/common/svgIcons";
import { ContactUsLinks } from "@src/components/common/layouts/layoutData";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Safe Haven | Contact Us</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="bg-white dark:bg-gray-900 px-4 mx-auto mt-32 sm:!px-10 lg:!px-32">
        <div className="gap-16 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center lg:text-left text-gray-900 dark:text-white">
              Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center lg:text-left text-gray-500 dark:text-gray-400 sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                placeholder="john@doe.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="gap-4 mx-auto mb-20 max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ContactUsLinks.map((d) => (
            <Card key={d.id} className="text-center">
              <div className="flex justify-center">
                {d.icon}
              </div>

              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {d.contact}
              </h5>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                {d.description}
              </p>
            </Card>
          ))}
        </div>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63432.56370732463!2d3.38054035323504!3d6.453654935303592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc9b07cf55%3A0xc4ae10b395418b9b!2sLagos%20Island!5e0!3m2!1sen!2sng!4v1684200130396!5m2!1sen!2sng"
            width="100%"
            height="300"
            className="border-none rounded-lg my-20"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
