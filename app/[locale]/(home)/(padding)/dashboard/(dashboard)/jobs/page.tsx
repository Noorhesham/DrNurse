import FunctionalButton from "@/app/components/FunctionalButton";

import MiniTitle from "@/app/components/MiniTitle";
import TableData from "@/app/components/TableData";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className=" flex items-center justify-between mb-3">
        <MiniTitle boldness="bold" size="lg" className=" -mt-2  uppercase" text="RECENTLY POSTED JOBS" />
        <FunctionalButton link="/dashboard/post-job" btnText="POST A JOB" />
      </div>
      <TableData />
    </div>
  );
};

export default page;
