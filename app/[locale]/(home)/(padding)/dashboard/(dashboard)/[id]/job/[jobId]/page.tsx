"use client";
import CompanyInfo from "@/app/components/CompanyInfo";
import FunctionalButton from "@/app/components/FunctionalButton";
import InfoItem from "@/app/components/InfoDoc";
import JobCard from "@/app/components/JobCard";
import MainProfile from "@/app/components/MainProfile";
import Spinner from "@/app/components/Spinner";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Paragraph from "@/app/components/defaults/Paragraph";
import { useGetEntities } from "@/app/components/inputsForm/CareerTypeInput";
import { Server } from "@/app/main/Server";
import { Job } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Briefcase, CalendarIcon, DollarSign, EditIcon, LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";

const page = ({ params: { jobId, locale } }: { params: { jobId: string; locale: string } }) => {
  const { data, isLoading } = useGetEntity("job", `job-${jobId}`, jobId);
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  if (!data || isLoading) return <Spinner />;
  const job = data.data;
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";

  const doctor = {
    name: job.job_title,
    image: "/job.svg",
    speciality: [job?.career_type?.title, job?.career_specialty?.title, job?.career_level?.title]
      .filter(Boolean)
      .join(", "),
    address: [job?.branch?.country?.title, job?.branch?.state?.title].filter(Boolean).join(", "),
    duration: "in 7 days",
  };


  return (
    <section>
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile user={doctor}>
            <div className="flex  items-center gap-4">
              <FunctionalButton
                className=" rounded-2xl"
                icon={<EditIcon className=" w-5 h-5" />}
                btnText="EDIT JOB"
                link={`/dashboard/${job.company?.id}/edit-job/${job.id}`}
              />
              <button
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    const res = await Server({
                      resourceName: "lock-job",
                      id: job.id,
                      body: {
                        status: "closed",
                        job_id: job.id,
                      },
                    });
                    if (res.status) {
                      toast.success(res.message);
                      queryClient.invalidateQueries({ queryKey: [`job-${jobId}`] });
                    } else toast.error(res.message);
                  });
                }}
                className={`  ${
                  job.status === "closed" ? " bg-red-500 text-gray-50" : " bg-[#D3DDEE] text-gray-800"
                }  p-3 rounded-xl `}
              >
                <div className=" w-6 h-6 relative">
                  <Image alt="lock" fill className=" object-contain" src="/lock.svg" />
                </div>
              </button>
              <button
                onClick={() => {
                  startTransition(async () => {
                    const res = await Server({
                      resourceName: "duplicate",
                      body: {
                        job_id: job.id,
                      },
                    });
                    if (res.status) {
                      toast.success(res.message);
                      queryClient.invalidateQueries({ queryKey: [`job-${job.id}`] });
                    } else toast.error(res.message);
                  });
                }}
                disabled={isPending}
                className=" text-gray-800 bg-[#D3DDEE]  p-3 rounded-xl "
              >
                <div className=" w-6 h-6 relative">
                  <Image alt="lock" fill className=" object-contain" src="/replace.svg" />
                </div>
              </button>
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            <section className=" flex flex-col gap-4">
              <div className=" flex flex-col gap-1">
                <MiniTitle boldness="bold" color=" text-main2" text="JOB DESCRIPTION" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_description || "") }}
                  className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
                />
              </div>
              {JSON.parse(job.benefits).length > 0 && (
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
              {job && (
                <div className=" flex items-center gap-2 mt-2">
                  <p className=" font-medium">SHARE THIS JOB</p>
                  <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
                    <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                      <FaFacebook /> FACEBOOK
                    </Button>
                    <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                      <FaXTwitter /> TWITTER
                    </Button>
                    <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                      <FaPinterest /> PINTREST
                    </Button>
                  </div>
                </div>
              )}
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
        <section className="mt-5" >
          <MiniTitle className=" mt-5" boldness="bold" 
           color=" text-main2" text="RELATED JOBS" />
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
