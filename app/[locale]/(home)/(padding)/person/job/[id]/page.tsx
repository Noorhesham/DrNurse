"use client";
import BreadCrumb from "@/app/components/BreadCrumb";
import FunctionalButton from "@/app/components/FunctionalButton";
import InfoItem from "@/app/components/InfoDoc";
import JobCard from "@/app/components/JobCard";
import JobHeader from "@/app/components/JobHeader";
import MainProfile from "@/app/components/MainProfile";
import Share from "@/app/components/Share";
import Spinner from "@/app/components/Spinner";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { useAuth } from "@/app/context/AuthContext";
import { Server } from "@/app/main/Server";
import { Job } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Briefcase, CalendarIcon, DollarSign, EarthIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useGetEntity("job", `job-${id}`, id, { nocompany: true });
  const [isPending, startTransition] = useTransition();
  const { userSettings, loading } = useAuth();

  if (isLoading || !data || loading || !userSettings) return <Spinner />;
  const job = data.data;
  const doctor = {
    name: job.job_title,
    image: "/Frame 48097786 (2).svg",
    speciality: [job?.career_type?.title, job?.career_specialty?.title, job?.career_level?.title]
      .filter(Boolean)
      .join(", "),
    address: job.branch?.address ? `${job.branch?.country?.title || ""}, ${job.branch?.state?.title || ""}` : "",
    duration: "in 7 days",
  };
  const queryClient = useQueryClient();
  const handleApply = () => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "apply-job",
        body: {
          job_id: job.id,
        },
      });
      queryClient.invalidateQueries({ queryKey: [`job-${id}`] });
      if (res.status) toast.success(res.message);
      else toast.error(res.message);
    });
  };
  const timeAgo = job?.created_at ? formatDistanceToNow(parseISO(job?.created_at), { addSuffix: true }) : "";

  console.log(job);
  return (
    <section className=" pt-36">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: `/person`, text: "Dashboard" },
          { href: `/job/${id}`, text: job.job_title },
        ]}
      />
      <JobHeader privatejob job={job} />

      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            <section className=" flex flex-col gap-2 ">
              <MiniTitle boldness="bold" color=" text-main2" text="JOB DESCRIPTION" />
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_description || "") }}
                className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
              />
              <div className="flex flex-col my-2 gap-1">
                {" "}
                <MiniTitle boldness="bold" color=" text-main2" text="JOB BENEFITS" />
                <ul className=" text-black list-disc lg:text-base text-sm  font-medium  leading-[1.7] ">
                  {JSON.parse(job.benefits)?.map((benefit: string) => (
                    <li className="" key={benefit}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-1 mt-5 items-start flex-col">
                <MiniTitle boldness="bold" color=" text-main2" text="Responsibilities" />
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_requirements || "") }}
                  className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium leading-[1.7] `}
                />
              </div>
              {job && (
                <div className=" flex items-center lg:flex-nowrap flex-wrap gap-2 mt-2">
                  <Share title={job.job_title} image={job.image} />
                </div>
              )}
            </section>
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <MiniTitle color="black" text="OVERVIEW" />
            <MiniTitle color="black" text="JOB INFO" />
            <div className=" flex flex-col gap-5">
              <InfoItem icon={<CalendarIcon className=" w-5 h-5" />} title="JOB POSTED" description={timeAgo} />
              <InfoItem icon={<PersonIcon className=" w-5 h-5" />} title="GENDER" description={job.gender} />
              {job?.family_status && (
                <InfoItem
                  icon={<PersonIcon className=" w-5 h-5" />}
                  title="FAMILY STATUS"
                  description={job.family_status}
                />
              )}
              {job?.nationality && (
                <InfoItem
                  icon={<EarthIcon className=" w-5 h-5" />}
                  title="NATIONALITY"
                  description={job.nationality.title}
                />
              )}
              {job.hide_salary === 0 && (
                <InfoItem
                  icon={<DollarSign className=" w-5 h-5" />}
                  title="SALARY EXPECTATIONS"
                  description={`${job.min_salary} ${job.currency || "sar"} -${job.max_salary} ${
                    job.currency || "sar"
                  } /MONTH`}
                />
              )}
              <InfoItem
                icon={<Briefcase />}
                title="EXPERIENCE"
                description={`${job.experience_from} - ${job.experience_to}`}
              />
            </div>
          </div>
        </GridContainer>
        <section className="mt-20">
          <MiniTitle boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {job.related_jobs?.map((job: Job, i: number) => (
              <JobCard bookmarked={job.bookmarked} i={i} key={job.id} job={job} />
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
