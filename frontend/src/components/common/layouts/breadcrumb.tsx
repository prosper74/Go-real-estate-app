import React, { FC } from 'react';
import Link from 'next/link';
import { ForwardArrowAlt, HomeAltIcon } from '../helpers/svgIcons';

interface IProps {
  property: string;
  category: string;
}

const Breadcrumb: FC<IProps> = ({ property, category }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ul className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white">
              <HomeAltIcon />
              Home
            </span>
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ForwardArrowAlt />
            <Link href={`/${category.toLocaleLowerCase()}`}>
              <span className="ml-1 md:ml-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white">
                {category}
              </span>
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ForwardArrowAlt />
            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">
              {property.substring(0, 15)}...
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
