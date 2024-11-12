"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CheckCircle } from "lucide-react";

import React from "react";
import { PaginationDemo } from "@/app/components/Pagination";
import ModalCustom from "@/app/components/defaults/ModalCustom";

import MeetingActions from "@/app/components/forms/MeetingActions";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useParams } from "next/navigation";
import Empty from "@/app/components/Empty";
import OffersTable from "@/app/components/tables/OffersTable";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("person-offers", "offers");
  if (isLoading || !data) return <Spinner />;

  const jobs = data?.data;
  return (
    <div className="">
      <div className=" flex flex-col gap-4 items-start justify-between">
        <MiniTitle boldness="bold" size="lg"  className="   uppercase" text="RECENTLY POSTED JOB OFFERS" />
        {jobs.length > 0 ? <OffersTable person={true} action={true} offers={jobs} /> : <Empty text="No job offers found" />}
      </div>
      {/* {jobs.length > 0 && <PaginationDemo />} */}
    </div>
  );
};

export default page;
