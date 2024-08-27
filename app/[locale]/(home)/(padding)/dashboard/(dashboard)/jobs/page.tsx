import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MiniTitle from "@/app/components/MiniTitle";
import TableData from "@/app/components/TableData";
import React from "react";

const page = () => {
  return (
    <div className="">
      <MiniTitle boldness="bold" size="lg" className=" -mt-2  uppercase" text="RECENTLY POSTED JOBS" />
      <TableData />
    </div>
  );
};

export default page;
