"use client";
import FunctionalButton from "@/app/components/FunctionalButton";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import TableData from "@/app/components/TableData";
import React from "react";
import Empty from "@/app/components/Empty";
import { useParams } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { PaginationDemo } from "@/app/components/Pagination";

const page = () => {
  const { id } = useParams();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetEntity("company-jobs", `company-jobs-${id}-${page}`);
  if (isLoading || !data) return <Spinner />;
  console.log(data);
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
      {/* <PaginationDemo /> */}
    </div>
  );
};

export default page;
