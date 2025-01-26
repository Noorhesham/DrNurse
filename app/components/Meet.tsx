import React, { useEffect, useState } from "react";
import MiniTitle from "./defaults/MiniTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import LocalTime from "./LocalTime";

// Format GMT to system's local time based on the device's timezone
const formatToLocalTime = (gmtDate: string | Date) => {
  const localDate = new Date(gmtDate);
  return localDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


const Meet = ({ cancel, img, meet, id }: { cancel?: boolean; img?: boolean; meet: any; id?: string }) => {
  if (!meet) return null;

  return (
    <div className="flex gap-1 items-stretch">
      <div className="flex flex-col items-center px-2 py-2 rounded-xl bg-main2 text-gray-50">
        <span className="text-sm">{format(new Date(meet?.created_at), "MMM").toUpperCase().slice(0, 2)}</span>
        <span className="font-semibold">{format(new Date(meet?.created_at), "dd")}</span>
      </div>
      <div className="hover:translate-x-3 cursor-pointer duration-150 ml-2 text-sm">
        <div className="flex items-center gap-2">
          {img && meet?.company && (
            <div className="w-10 h-10 relative">
              <Image
                src={meet?.company.logo?.[0]?.file || "/nanana.svg"}
                alt={"doctor"}
                fill
                className={"object-cover rounded-2xl"}
              />
            </div>
          )}
          <div className="mb-[0.5px]">
            <MiniTitle
              boldness="extraBold"
              size="md"
              color=" text-black"
              text={meet.req_job_post?.job_title || meet.invited?.name}
            />
            {meet?.company && <h2 className="text-black font-semibold text-base">{meet.company.title}</h2>}
            {meet?.invited && (
              <Link href={`/dashboard/${id}/doctor/${meet?.invited?.profile?.id}`} className="text-gray-600">
                {meet.invited.name}
              </Link>
            )}
          </div>
        </div>
        <div className="flex  mt-2 flex-col">
          <p className="text-sm text-gray-500 text-muted-foreground">
            GMT : {meet.slot ? formatToLocalTime(meet.slot.from_date) : formatToLocalTime(meet.created_at)}
          </p>
          <LocalTime date={meet.slot?.from_date} />
        </div>
      </div>

      {cancel && (
        <Button className="self-center ml-auto" size={"lg"} variant={"destructive"}>
          CANCEL
        </Button>
      )}
    </div>
  );
};

export default Meet;
