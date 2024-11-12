"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";

import React from "react";
import FunctionalButton from "@/app/components/FunctionalButton";
import { PaginationDemo } from "@/app/components/Pagination";
import { useParams } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";

import OffersTable from "@/app/components/tables/OffersTable";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("offers", `offers-${id}`);
  if (isLoading || !data) return <Spinner />;
  const jobs = data?.data;


  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex md:flex-row flex-col gap-4 items-start justify-between">
        <MiniTitle boldness="bold" size="lg" className="   uppercase" text="RECENTLY POSTED JOB OFFERS" />
      </div>
      <OffersTable action={false} offers={jobs} />
      {/* <PaginationDemo /> */}
    </div>
  );
};

export default page;
