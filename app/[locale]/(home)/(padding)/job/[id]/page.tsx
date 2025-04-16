"use client";
import AddToWishlist from "@/app/components/AddToWishlist";
import BreadCrumb from "@/app/components/BreadCrumb";
import FunctionalButton from "@/app/components/FunctionalButton";
import InfoItem from "@/app/components/InfoDoc";
import JobCard from "@/app/components/JobCard";
import MainProfile from "@/app/components/MainProfile";
import Share from "@/app/components/Share";
import Spinner from "@/app/components/Spinner";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { Job } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useGetEntity } from "@/lib/queries";
import { convertToHTML } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import { Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const { data, isLoading } = useGetEntity("job", `job-${id}`, id, { nocompany: true });
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  if (isLoading || !data) return <Spinner />;
  const job = data.data;
  const doctor = {
    name: job.job_title,
    image: "/Frame 48097786 (3).svg",
    speciality: [job?.career_type?.title, job?.career_specialty?.title, job?.career_level?.title]
      .filter(Boolean)
      .join(", "),
    address: job.branch?.address ? `${job.branch?.country?.title || ""}, ${job.branch?.state?.title || ""}` : "",
  };

  return (
    <section className=" pt-36">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: `/job/${id}`, text: job.job_title },
        ]}
      />
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile h1={true} user={doctor}>
            <div className="flex  items-center gap-2">
              <FunctionalButton
                btnText={"APPLY FOR JOB"}
                icon={null}
                content={
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <FaExclamationCircle size={40} className=" text-main" />
                    <h2 className=" text-main text-lg font-semibold">SORRY !</h2>
                    <p className=" max-w-md text-center  text-base"> YOU ARE NOT LOGGED IN</p>
                    <div className="flex  gap-2">
                      <Link href="/login">
                        {" "}
                        <Button size="sm" className="rounded-full">
                          LOGIN
                        </Button>
                      </Link>
                      <DialogClose asChild>
                        <Button size="sm" className="rounded-full">
                          Close
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                }
              />
              <div className="   bg-gray-200 p-3 rounded-2xl">
                <AddToWishlist wishlistStatus={job.bookmarked} id={job.id} />
              </div>
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            <section className=" flex flex-col gap-2 ">
              <MiniTitle boldness="bold" color=" text-main2" text="JOB DESCRIPTION" />
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(job.job_description || "") }}
                className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium  leading-[1.7] `}
              />
              <div className=" text-black lg:text-base text-sm  font-medium  leading-[1.7] ">
                {JSON.parse(job.benefits)?.map((benefit: string) => (
                  <p className="" key={benefit}>
                    {benefit}
                  </p>
                ))}
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
              <InfoItem icon={<PersonIcon />} title="GENDER" description={job.gender} />
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
                description={`${job.experience_from} - ${job.experience_to} Years`}
              />
            </div>
          </div>
        </GridContainer>
        <section className=" mt-20">
          <MiniTitle boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            {job.related_jobs?.map((job: Job, i: number) => (
              <JobCard parentId={id} i={i} key={job.id} job={job} />
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
