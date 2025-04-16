"use client";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Notification from "@/app/components/defaults/Notification";
import { useGetEntities } from "@/app/components/inputsForm/CareerTypeInput";
import { PaginationDemo } from "@/app/components/Pagination";
import Spinner from "@/app/components/Spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchaParams = useSearchParams();
  const page = searchaParams.get("page");
  const { data, isLoading } = useGetEntities({
    resourceName: "getEntity",
    entityName: "rmnotifications",
    key: `notifications=${page}`,
    queryParams: `page=${page}&order_dir=desc` || "page=1",
    cache: 1,
  });
  if (isLoading || !data)
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="flex  gap-4  flex-col space-y-3">
            <Skeleton className={`w-full h-[125px]  rounded-xl`} />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );

  const totalPages = Math.ceil(data.count / 9);

  return (
    <div className=" flex  flex-col gap-8">
      <MiniTitle size="2xl" boldness="bold" color=" text-main2" text="Notifications" />
      {data.data.map((doc: any, i: number) => (
        <Notification
          notification={{
            name: doc.title,
            image: doc.main_thumbnail?.[0]?.file || "/3177336.png",
            speciality: format(new Date(doc.created_at), "dd/MM/yyyy"),
            content: doc.content,
          }}
          show={false}
          key={i}
        />
      ))}{" "}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <PaginationDemo totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default page;
