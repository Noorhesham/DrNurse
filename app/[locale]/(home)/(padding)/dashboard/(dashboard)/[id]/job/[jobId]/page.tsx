"use client";
import JobBenefits from "@/app/components/JobBenefits";
import JobCard from "@/app/components/JobCard";
import JobHeader from "@/app/components/JobHeader";
import JobInfo from "@/app/components/JobInfo";
import Share from "@/app/components/Share";
import Spinner from "@/app/components/Spinner";
import VerificationStatus from "@/app/components/VerficationStatus";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { Job } from "@/app/types";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
const page = ({ params: { jobId } }: { params: { jobId: string } }) => {
  const { data, isLoading } = useGetEntity("job", `job-${jobId}`, jobId);
  if (!data || isLoading) return <Spinner />;
  const job = data.data;
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";
  return (
    <section>
      <JobHeader job={job} />
      <MaxWidthWrapper>
        <GridContainer className=" items-center gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            {job.status === "draft" && (
              <div className=" my-4">
                <VerificationStatus
                  verification_type={job.status}
                  message="This is a draft job , it must be edited  or published "
                />
              </div>
            )}
            <section className=" flex flex-col gap-4">
              <div className=" flex flex-col gap-1">
                <MiniTitle boldness="bold" color=" text-main2" text="JOB DESCRIPTION" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_description || "") }}
                  className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
                />
              </div>
              <JobBenefits job={job} />
              <div className="flex gap-1 mt-5 items-start flex-col">
                <MiniTitle boldness="bold" color=" text-main2" text="Responsibilities" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_requirements || "") }}
                  className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium leading-[1.7] `}
                />
              </div>
              {job && <Share title={job.job_title} image={job.image} />}
            </section>
          </div>
          <JobInfo job={job} timeAgo={timeAgo} />
        </GridContainer>
        {/* <section className="mt-5">
          <MiniTitle className=" mt-5" boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {job.related_jobs?.map((job: Job, i: number) => (
              <JobCard parentId={jobId} i={i} key={job.id} job={job} />
            ))}
          </div>
        </section> */}
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
