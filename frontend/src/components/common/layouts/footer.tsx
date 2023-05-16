import {
  FooterSocials,
  LegalMenu,
  MainMenu,
  ResourcesMenu,
} from "./layoutData";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 sm:!px-10 lg:!px-32">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="logo" width={250} height={40} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Properties
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                {MainMenu.map((menu) => (
                  <li key={menu.id} className="mb-4">
                    <Link href={menu.url} className="hover:underline">
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                {ResourcesMenu.map((menu) => (
                  <li key={menu.id} className="mb-4">
                    <Link href={menu.url} className="hover:underline">
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                {LegalMenu.map((menu) => (
                  <li key={menu.id} className="mb-4">
                    <Link href={menu.url} className="hover:underline">
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a
              href="https://atuprosper.com/"
              target="_blank"
              className="hover:underline"
            >
              Atu Prosper
            </a>
            . Made with love
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            {FooterSocials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                {social.icon}
                <span className="sr-only">{social.name} page</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
