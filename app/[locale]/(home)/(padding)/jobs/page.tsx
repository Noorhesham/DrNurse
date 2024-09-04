import Filters from "@/app/components/Filters";
import GridContainer from "@/app/components/defaults/GridContainer";
import JobCard from "@/app/components/JobCard";
import { PaginationDemo } from "@/app/components/Pagination";
import React from "react";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import FilterMobile from "@/app/components/FilterPhone";

const page = () => {
  return (
    <MaxWidthWrapper>
      <GridContainer className=" mt-5 gap-4" cols={8}>
        {" "}
        <div className=" col-span-2 lg:col-span-3">
          <div className=" lg:block hidden ">
            <Filters />
          </div>
          <FilterMobile />
        </div>
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-5">
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <JobCard heading="Anesthesiologist" />
          <PaginationDemo />
        </div>
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default page;
