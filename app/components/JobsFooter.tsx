"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import Link from "next/link";

const JobsFooter = () => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Spinner />;
  const { latest_jobs } = generalSettings;
  return (
    <div>
      <ul className=" lg:list-disc grid grid-cols-1 lg:grid-cols-2 w-full items-center lg:place-items-start place-items-center  text-white gap-2 ">
        {latest_jobs.map((job: any) => (
          <Link
            className="lg:border-none border-b border-gray-50 w-fit pb-2"
            href={`/job/${job.id}`}
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
