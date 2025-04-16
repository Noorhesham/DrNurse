"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetLoading } from "../hooks/useSetLoadingt";

export function PaginationDemo({ totalPages = 5 }: { totalPages?: number }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { WrapperFn } = useSetLoading();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    //@ts-ignore
    url.searchParams.set("page", page);
    replace(url.toString(), { scroll: false });
    setCurrentPage(page);
  };

  return (
    <Pagination className="mt-10 w-full flex justify-center overflow-hidden">
      <PaginationContent className="flex gap-1 sm:gap-2 px-2">
        {/* Previous Button */}
        <PaginationItem>
          <button
            className={`rounded-full ${
              currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""
            } flex items-center px-1 py-1 lg:px-3 lg:py-3 text-sm md:text-base text-main2 bg-light duration-150 hover:text-white hover:bg-main2`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) WrapperFn(() => handlePageChange(currentPage - 1));
            }}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
          </button>
        </PaginationItem>

        {/* Page Numbers (visible up to 5 pages on small screens) */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const showPage = totalPages <= 5 || page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;

          return showPage ? (
            <PaginationItem key={page}>
              <PaginationLink
                className={`text-sm md:text-base px-3 py-2 ${
                  currentPage === page
                    ? "bg-main2 text-white rounded-full"
                    : "hover:bg-light hover:text-main2 rounded-full"
                }`}
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  WrapperFn(() => handlePageChange(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}

        {/* Ellipsis for hidden pages (mobile) */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem className=" hidden lg:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <button
            className={`rounded-full ${
              currentPage >= totalPages ? "cursor-not-allowed opacity-50" : ""
            } flex items-center px-1 py-1 lg:px-3 lg:py-3 text-sm md:text-base text-main2 bg-light duration-150 hover:text-white hover:bg-main2`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) WrapperFn(() => handlePageChange(currentPage + 1));
            }}
          >
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
