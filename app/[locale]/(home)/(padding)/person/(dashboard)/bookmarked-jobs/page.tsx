import JobCard from "@/app/components/JobCard";
import { PaginationDemo } from "@/app/components/Pagination";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col gap-3 col-span-2 lg:col-span-5">
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
    </main>
  );
};

export default page;
