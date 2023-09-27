"use client";

import { Pagination } from "flowbite-react";
import Router from "next/router";

interface IProps {
  currentPage: number;
  setCurrentPage: any;
  totalReviews: number;
  postsPerPage: number;
}

export default function PaginationWithNavigation({
  currentPage,
  setCurrentPage,
  totalReviews,
  postsPerPage,
}: IProps) {
  let totalPages: number = Math.ceil(totalReviews / postsPerPage);

  return (
    <div className="flex items-center justify-center text-center">
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          Router.push("#reviews_section");
        }}
        showIcons
        totalPages={totalPages}
      />
    </div>
  );
}
