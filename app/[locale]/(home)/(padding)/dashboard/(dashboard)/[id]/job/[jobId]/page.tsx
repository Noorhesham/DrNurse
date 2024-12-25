"use client";
import InfoItem from "@/app/components/InfoDoc";
import JobCard from "@/app/components/JobCard";
import JobHeader from "@/app/components/JobHeader";
import Share from "@/app/components/Share";
import Spinner from "@/app/components/Spinner";
import VerificationStatus from "@/app/components/VerficationStatus";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { Job } from "@/app/types";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Briefcase, CalendarIcon, DollarSign } from "lucide-react";
import React from "react";
import { GoLocation } from "react-icons/go";
const page = ({ params: { jobId } }: { params: { jobId: string } }) => {
  const { data, isLoading } = useGetEntity("job", `job-${jobId}`, jobId);
  if (!data || isLoading) return <Spinner />;
  const job = data.data;
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";

  return (
    <section>
      <JobHeader job={job} />
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
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
              {JSON.parse(job?.benefits)?.length > 0 && (
                <div className="flex gap-1 flex-col">
                  {<MiniTitle boldness="bold" color=" text-main2" text="JOB BENEFITS" />}
                  {JSON.parse(job.benefits).map((benefit: string, index: number) => (
                    <p
                      key={index}
                      className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
                    >
                      {benefit}
                    </p>
                  ))}
                </div>
              )}
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
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <MiniTitle color="black" text="OVERVIEW" />

            <MiniTitle color="black" text="HOSPITAL INFO" />
            <div className=" flex flex-col gap-5">
              <InfoItem icon={<CalendarIcon className=" w-5 h-5" />} title="JOB POSTED" description={timeAgo} />
              <InfoItem icon={<PersonIcon className=" w-5 h-5" />} title="GENDER" description={job.gender} />
              {job.hide_salary === 0 && (
                <InfoItem
                  icon={<DollarSign className=" w-5 h-5" />}
                  title="SALARY EXPECTATIONS"
                  description={`${job.min_salary} ${job.currency || "sar"} -${job.max_salary} ${
                    job.currency || "sar"
                  } /MONTH`}
                />
              )}
              {job.branch?.country?.title && job.branch?.state?.title && (
                <InfoItem
                  icon={<GoLocation className=" w-5 h-5" />}
                  title="LOCATION"
                  description={`${job.branch?.country?.title || ""}, ${job.branch?.state?.title || ""}`}
                />
              )}

              <InfoItem
                icon={<Briefcase className=" w-5 h-5" />}
                title="EXPERIENCE"
                description={`${job.experience_from} - ${job.experience_to} Years`}
              />
            </div>
          </div>
        </GridContainer>
        <section className="mt-5">
          <MiniTitle className=" mt-5" boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {job.related_jobs?.map((job: Job, i: number) => (
              <JobCard i={i} key={job.id} job={job} />
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
