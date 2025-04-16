"use client";
import AddNewManager from "@/app/components/forms/AddNewManager";
import Manager from "@/app/components/Manager";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import React from "react";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("controlManagers", `control_managers-${id}`);
  if (isLoading || !data) return <Spinner />;
  return (
    <section>
      <div className=" mt-10">
        <AddNewManager id={id} data={data} />
      </div>
    </section>
  );
};

export default page;
