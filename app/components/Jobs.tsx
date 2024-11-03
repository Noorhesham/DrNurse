"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import JobCard from "@/app/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "@/app/components/Empty";
import { PaginationDemo } from "@/app/components/Pagination";
import { Job } from "@/app/types";
import GridContainer from "./defaults/GridContainer";
import Filters from "./Filters";
import FilterMobile from "./FilterPhone";
import { useLoading } from "../context/LoadingContext";

interface JobsListProps {
  jobs: Job[];
  totalPages: number;
  filters?: any;
}

const JobsList = ({ jobs, totalPages, filters }: JobsListProps) => {
  const { isLoading } = useLoading();
  return (
    <GridContainer className=" mt-5 gap-4" cols={9}>
      <div className="flex order-1 lg:order-0 flex-col gap-3 col-span-2 lg:col-span-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div className="flex flex-col space-y-3">
              <Skeleton className={`w-full h-[125px]  rounded-xl`} />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job: Job, i: number) => <JobCard i={i} key={job.id} job={job} />)
        ) : (
          <Empty text="No Jobs Found !" textLink="Reset Filters !" link="/jobs" />
        )}

        <PaginationDemo totalPages={totalPages} />
      </div>{" "}
      <div className=" col-span-2 lg:col-span-3">
        <div className=" lg:block hidden ">
          <Filters from_years={false} filters={filters} />
        </div>
        <FilterMobile />
      </div>
    </GridContainer>
  );
};

export default JobsList;
