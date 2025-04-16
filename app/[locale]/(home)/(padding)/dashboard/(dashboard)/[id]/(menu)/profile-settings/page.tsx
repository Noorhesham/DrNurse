"use client";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import HospitalProfileSettings from "@/app/components/forms/HospitalForm";
import Spinner from "@/app/components/Spinner";
import { useGetEntity } from "@/lib/queries";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("company", `company-${id}`, `${id}`);
  if (!data || isLoading) return <Spinner />;

  return (
    <>
      <HospitalProfileSettings defaultData={data.data} />
    </>
  );
};

export default page;
