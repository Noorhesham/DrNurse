"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";

import React from "react";
import FunctionalButton from "@/app/components/FunctionalButton";
import { PaginationDemo } from "@/app/components/Pagination";
import { useParams, useSearchParams } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import OffersTable from "@/app/components/tables/OffersTable";
import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Link from "next/link";
import Paragraph from "@/app/components/defaults/Paragraph";

const page = () => {
  const searchaParams = useSearchParams();
  const page = searchaParams.get("page");

  const { id } = useParams();
  const { data, isLoading } = useGetEntity("offers", `offers-${id}-${page}`, "", {}, `page=${page}&itemCount=10`);
  if (isLoading || !data)
    return (
      <MaxWidthWrapper noPadding className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="flex  gap-4  flex-col space-y-3">
            <Skeleton className={`w-full h-[125px]  rounded-xl`} />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    );

  const jobs = data?.data;
  const totalPages = Math.ceil(data.count / 9);
  console.log(data);
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex md:flex-row flex-col gap-4 items-start justify-between">
        <MiniTitle boldness="bold" size="lg" className="   uppercase" text="RECENTLY POSTED JOB OFFERS" />
        <FunctionalButton btnText="ADD JOB OFFER" link={`/dashboard/${id}/add-job-offer`} />
      </div>
      {jobs.length > 0 ? (
        <OffersTable action={false} offers={jobs} />
      ) : (
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <Paragraph size="lg" description="No job offers found" />
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <PaginationDemo totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default page;
