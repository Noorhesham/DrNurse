import Image from "next/image";
import React from "react";
import { Location } from "./Icons";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import { Job } from "../types";
import { formatDistanceToNow, parseISO } from "date-fns";
import AddToWishlist from "./AddToWishlist";

const JobCard = ({ job, i }: { job: Job; i: number }) => {
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";
  const imageIndex = (i % 6) + 1;
  console.log(job)
  return (
    <MotionItem className=" ">
      <div className="shadow-sm hover:bg-gradient-to-r from-light to-white  duration-150  bg-white rounded-2xl w-full gap-2   border-2 border-input px-6 md:px-10 py-3 md:py-7 flex flex-col">
        <Link href={`/person/job/${job.id}`} className=" font-semibold text-base lg:text-2xl text-gray-900  uppercase">
          {job.job_title}
        </Link>
        <Link href={`/person/job/${job.id}`} className=" flex  gap-4 items-center ">
          <div className=" text-blue-700 bg-blue-200 uppercase font-medium rounded-xl text-xs py-1.5 px-5">
            {job.career_level?.title}
          </div>
          {job.min_salary !== null && (
            <p className="  sm:text-sm font-medium text-muted-foreground">
              Salary: {job.min_salary} {job.currency} - {job.max_salary} {job.currency}
            </p>
          )}
        </Link>
        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
          <div className=" w-12 h-12 relative">
            <Image alt="hospital" fill src={`/job-${imageIndex}.png`} className=" object-cover" />
          </div>
          <div className=" p-1 flex flex-col text-sm sm:text-base lg:text-lg items-start gap-1">
            <h3>#Hospital : {job.company_id}</h3>
            <div className=" flex text-sm  items-center gap-2">
              <Location sizes={{ width: 14, height: 14 }} />
              <p>
                {job.branch?.country?.title},{job.branch?.state?.title}
              </p>
            </div>
          </div>
          <div className="   ml-auto items-end md:flex-col flex-row-reverse self-end gap-2 flex">
            <AddToWishlist wishlistStatus={job.bookmarked} id={job.id} />
            <p className=" text- lg:text-sm text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      </div>
    </MotionItem>
  );
};

export default JobCard;
