import Image from "next/image";
import React from "react";
import { Location } from "./Icons";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import { Job } from "../types";
import { formatDistanceToNow, parseISO } from "date-fns";
import AddToWishlist from "./AddToWishlist";

const JobCard = ({
  job,
  i,
  bookmarked,
  parentId,
  disabled = false,
}: {
  job: Job;
  i: number;
  bookmarked?: boolean;
  parentId?: string;
  disabled?: boolean;
}) => {
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";
  const imageIndex = (i % 6) + 1;
  console.log(job);
  return (
    <MotionItem exit={{ opacity: 0, scale: 0.3 }} className=" ">
      <div className="shadow-sm hover:bg-gradient-to-r from-light to-white  duration-150  bg-white rounded-2xl w-full gap-2   border-2 border-input px-6 md:px-10 py-3 md:py-7 flex flex-col">
        {
          <Link
            href={disabled ? "#" : `/person/job/${job.id}`}
            className=" line-clamp-1 font-semibold text-base lg:text-2xl text-gray-900  uppercase"
          >
            {job.job_title}
          </Link>
        }
        <Link
          href={disabled ? "#" : `/person/job/${job.id}`}
          className="  gap-2 flex lg:flex-none flex-wrap items-start lg:gap-4 lg:items-center "
        >
          {job.career_level && (
            <div className=" text-blue-700 w-fit bg-blue-200 uppercase font-medium rounded-xl text-xs py-1 lg:py-1.5  px-3 lg:px-5">
              {job.career_level?.title}
            </div>
          )}
          {job.min_salary !== null && (
            <p className="  text-sm font-medium text-muted-foreground">
              Salary: {job.min_salary} {job.currency} - {job.max_salary} {job.currency}
            </p>
          )}
        </Link>
        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
          <div className="flex  gap-2 items-center">
            <div className=" w-12 h-12 relative">
              <Image alt="hospital" fill src={`/job-${imageIndex}.png`} className=" object-cover" />
            </div>
            <div className=" p-1 flex flex-col text-sm sm:text-base lg:text-lg items-start">
              <h3>#Hospital : {job.company_id}</h3>
              {(job.branch?.country || job.country) && (
                <div className="flex items-center gap-2 text-sm">
                  <Location sizes={{ width: 14, height: 14 }} />
                  <p className="text-xs flex flex-wrap  lg:text-base">
                    <span> {job.branch?.country?.title || job.country?.title || "Unknown Country"},</span>
                    <span>{job.branch?.state?.title || job.state?.title || "Unknown State"}</span>
                    {/* <span>{job.branch?.city?.title || job.city?.title || "Unknown City"}</span> */}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="   ml-auto items-end md:flex-col flex-row-reverse self-end gap-2 flex">
            <AddToWishlist parentId={parentId} wishlistStatus={bookmarked || job.bookmarked} id={job.id} />
            <p className=" text- lg:text-sm text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      </div>
    </MotionItem>
  );
};

export default JobCard;
