import React, { FC } from "react";
import { Tab } from "@headlessui/react";
import { SingleProperty } from "../helpers/interfaces";
import MarkdownView from "react-showdown";
import Reviews from "../reviews";

const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(" ");
};

interface IProps {
  property: SingleProperty;
}

const DescriptionTab: FC<IProps> = ({ property }) => {
  return (
    <div className="w-full py-8 items-center">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-purple-100 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-lg leading-5 font-medium text-gray-900 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
              )
            }
          >
            Description
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-lg leading-5 font-medium text-gray-900 rounded-lg",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-500 ring-white ring-opacity-60",
                selected
                  ? "bg-white shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
              )
            }
          >
            Reviews
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "bg-white rounded-xl shadow-lg p-3",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
            )}
          >
            <div className="markdown-view">
              <MarkdownView markdown={property.Description} />
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "bg-white rounded-xl shadow-lg p-2",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60"
            )}
          >
            <Reviews />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DescriptionTab;
