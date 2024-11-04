"use client";
import React from "react";
import { useLoading } from "../context/LoadingContext";
import GridContainer from "./defaults/GridContainer";
import { Skeleton } from "@/components/ui/skeleton";
import Applicant from "./Applicant";
import Empty from "./Empty";
import { useParams } from "next/navigation";
import MiniTitle from "./defaults/MiniTitle";
import Sort from "./Sort";
import { PaginationDemo } from "./Pagination";
import FilterMobile from "./FilterPhone";
import Filters from "./Filters";

const Profiles = ({ doctors, totalPages, filters, count, jobId }: any) => {
  const { isLoading } = useLoading();
  const { id } = useParams();
  return (
    <GridContainer className=" mt-5 gap-4" cols={9}>
      <div className="flex order-1 lg:order-0 flex-col gap-3 col-span-2 lg:col-span-6">
        {" "}
        <div className="flex items-start justify-between">
          <MiniTitle boldness="normal" size="lg" color=" text-muted-foreground" text={`${count} EMPLOYEES AVAILABLE`} />
          <Sort
            options={[
              { label: "Latest", value: "desc" },
              { label: "Earliest", value: "asc" },
            ]}
          />
        </div>
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
        ) : doctors.length > 0 ? (
          doctors.map((doc: any) => (
            <Applicant
              jobId={jobId || ""}
              notification
              show={false}
              key={doc.name}
              applicant={{
                name: doc.name,
                image: doc.avatar,
                speciality: [doc?.career_type?.title, doc?.career_specialty?.title, doc?.career_level?.title]
                  .filter(Boolean)
                  .join(", "),
                address: `${doc.current_location.title}`,
                duration: `${doc.years_of_experience} of experience`,
                id: doc.id,
              }}
            />
          ))
        ) : (
          <Empty text="No Applicants Found !" textLink="Reset Filters !" link={`/dashboard/${id}/employees`} />
        )}
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <PaginationDemo totalPages={totalPages} />
        </div>
      </div>{" "}
      <div className=" col-span-2 lg:col-span-3">
        <div className=" lg:block hidden ">
          <Filters from_years filters={filters} />
        </div>
        <FilterMobile />
      </div>
    </GridContainer>
  );
};

export default Profiles;
