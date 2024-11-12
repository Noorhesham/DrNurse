"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Notification from "@/app/components/defaults/Notification";
import { useGetEntities } from "@/app/components/inputsForm/CareerTypeInput";
import Spinner from "@/app/components/Spinner";
import { format } from "date-fns";
import React from "react";

const page = () => {
  const { data, isLoading } = useGetEntities({
    resourceName: "getEntity",
    entityName: "rmnotifications",
    key: "notifications",
  });
  if (isLoading || !data) return <Spinner />;
  return (
    <div className=" flex  flex-col gap-8">
      <MiniTitle size="2xl" boldness="bold" color=" text-main2" text="Notifications" />
      {data.data.map((doc: any, i: number) => (
        <Notification
          notification={{
            name: doc.title,
            image: doc.main_thumbnail[0].file || "",
            speciality: format(new Date(doc.created_at), "dd/MM/yyyy"),
            content: doc.content,
          }}
          show={false}
          key={i}
        />
      ))}
    </div>
  );
};

export default page;
