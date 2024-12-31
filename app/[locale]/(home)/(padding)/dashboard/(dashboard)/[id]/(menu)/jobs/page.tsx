"use client";
import FunctionalButton from "@/app/components/FunctionalButton";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import TableData from "@/app/components/TableData";
import React from "react";
import Empty from "@/app/components/Empty";
import { useParams, useSearchParams } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { PaginationDemo } from "@/app/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

const page = () => {
  const { id } = useParams();
  const searchaParams = useSearchParams();
  const page = searchaParams.get("page");
  const { data, isLoading } = useGetEntity(
    "company-jobs",
    `company-jobs-${id}-${page}`,
    "",
    {},
    `page=${page}&itemCount=10&&sort=desc`
  );
  console.log()
  if (isLoading || !data)
    return (
      <MaxWidthWrapper className="flex flex-col gap-4">
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
  const totalPages = Math.ceil(data.count / 9);
  return (
    <div className="">
      <div className=" flex items-center justify-between mb-3">
        <MiniTitle boldness="bold" size="lg" className=" -mt-2  uppercase" text="RECENTLY POSTED JOBS" />
        <FunctionalButton link={`/dashboard/${id}/post-job`} btnText="POST A JOB" />
      </div>
      {data.data.length > 0 ? (
        <TableData jobs={data.data} />
      ) : (
        <Empty text="No Jobs Posted Yet !" link={`/dashboard/${id}/post-job`} textLink="Post a Job Now !" />
      )}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <PaginationDemo totalPages={totalPages} />
        </div>
      )}{" "}
    </div>
  );
};

export default page;
