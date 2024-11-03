import JobCard from "@/app/components/JobCard";
import { PaginationDemo } from "@/app/components/Pagination";
import { Server } from "@/app/main/Server";
import React from "react";

const page = async ({ searchParams }: { searchParams: any }) => {
  const queryParams = new URLSearchParams({});
  queryParams.append("page", searchParams.page || "1");
  queryParams.append("itemsCount", searchParams.itemsCount || "10");
  const bookmarks = await Server({ resourceName: "bookmarks" });
  return (
    <main className="flex flex-col gap-3 col-span-2 lg:col-span-5">
      {bookmarks.data.map((item: any, i: number) => (
        <JobCard i={i} key={item.id} job={item} />
      ))}
      {bookmarks.data.length > 10 && <PaginationDemo />}
    </main>
  );
};

export default page;
