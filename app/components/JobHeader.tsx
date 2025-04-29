"use client";
import React, { useTransition } from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import MainProfile from "./MainProfile";
import FunctionalButton from "./FunctionalButton";
import { CalendarIcon, EditIcon } from "lucide-react";
import TooltipButton from "./ToolTipButton";
import { useQueryClient } from "@tanstack/react-query";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import MeetingForm from "./forms/MeetingForm";
import { useRouter } from "next/navigation";

const JobHeader = ({ job, privatejob }: { job: any; privatejob?: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const doctor = {
    name: job.job_title,
    image: "/Frame 48097786 (3).svg",
    speciality: [job?.career_type?.title, job?.career_specialty?.title, job?.career_level?.title]
      .filter(Boolean)
      .join(", "),
    address: [job?.branch?.country?.title, job?.branch?.state?.title].filter(Boolean).join(", "),
  };
  return (
    <div className=" rounded-2xl bg-light ">
      <MaxWidthWrapper>
        <MainProfile h1={true} user={doctor}>
          {!privatejob && (
            <div className="flex flex-col gap-2">
              <div className="flex  items-center gap-4">
                <FunctionalButton
                  className=" rounded-2xl"
                  icon={<EditIcon className=" w-5 h-5" />}
                  btnText="EDIT JOB"
                  link={`/dashboard/${job.company?.id}/edit-job/${job.id}`}
                />{" "}
                {/* Lock Job Button */}
                <TooltipButton
                  tooltipText={job.status === "closed" ? "Job is already closed" : "Close this job"}
                  onClick={() => {
                    startTransition(async () => {
                      const res = await Server({
                        resourceName: "lock-job",
                        id: job.id,
                        body: {
                          status: job.status === "closed" ? "publish" : "closed",
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
                  className={job.status === "closed" ? "bg-red-500 text-gray-50" : "bg-[#D3DDEE] text-gray-800"}
                  iconSrc="/lock.svg"
                  altText="lock"
                />
                {/* Duplicate Job Button */}
                <TooltipButton
                  tooltipText="Duplicate this job"
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
                        console.log(res);
                        router.push(`/dashboard/${job.company?.id}/edit-job/${res.new_job_id}`);
                        queryClient.invalidateQueries({ queryKey: [`job-${job.id}`] });
                      } else toast.error(res.message);
                    });
                  }}
                  disabled={isPending}
                  className="bg-[#D3DDEE] !uppercase text-gray-800"
                  iconSrc="/replace.svg"
                  altText="duplicate"
                />{" "}
              </div>
              {!privatejob && (
                <FunctionalButton
                  btnText="SET SLOTS"
                  className=" !rounded-2xl"
                  icon={<CalendarIcon className=" w-5 h-5" />}
                  content={<MeetingForm jobIdDef={job.id} invite={false} />}
                />
              )}
            </div>
          )}
        </MainProfile>
      </MaxWidthWrapper>
    </div>
  );
};

export default JobHeader;
