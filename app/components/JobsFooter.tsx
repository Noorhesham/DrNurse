"use client";
import React from "react";
import Spinner from "./Spinner";
import Link from "next/link";
import useCachedQuery from "../hooks/useCachedData";

const JobsFooter = () => {
  const { loading, data: general_settings } = useCachedQuery("general_settings");
  const { loading: loading2, data: user_settings } = useCachedQuery("user_settings");

  if (loading || loading2) return <Spinner />;
  else
    return (
      <div>
        <ul
          className=" lg:list-disc grid grid-cols-1 lg:grid-cols-3
        w-full items-center lg:place-items-start place-items-center  text-white  gap-x-8 "
        >
          {general_settings?.latest_jobs?.map((job: any) => (
            <Link
              className="lg:border-none  w-fit pb-2"
              href={user_settings ? `/person/job/${job.id}` : `/job/${job.id}`}
              target="_blank"
              key={job.id}
            >
              {job.job_title}
            </Link>
          ))}
        </ul>
      </div>
    );
};

export default JobsFooter;
