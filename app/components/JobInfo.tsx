import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import InfoItem from "./InfoDoc";
import { Briefcase, CalendarIcon, DollarSign, EarthIcon } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import { GoLocation } from "react-icons/go";

const JobInfo = ({ job, timeAgo }: { job: any; timeAgo: string }) => {
  return (
    <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  !h-fit bg-light">
      <MiniTitle color="black" text="JOB INFO" />
      <div className=" flex flex-col gap-5">
        {timeAgo && <InfoItem icon={<CalendarIcon className=" w-5 h-5" />} title="JOB POSTED" description={timeAgo} />}
        {
          <InfoItem
            icon={<PersonIcon className=" w-5 h-5" />}
            title="GENDER"
            description={job.gender || "NOT SPECIFIED"}
          />
        }
        {
          <InfoItem
            icon={<PersonIcon className=" w-5 h-5" />}
            title="FAMILY STATUS"
            description={job.family_status || "NOT SPECIFIED"}
          />
        }
        {job?.nationality && (
          <InfoItem icon={<EarthIcon className=" w-5 h-5" />} title="NATIONALITY" description={job.nationality.title} />
        )}{" "}
        {job.hide_salary === 0 && (
          <InfoItem
            icon={<DollarSign className=" w-5 h-5" />}
            title="SALARY EXPECTATIONS"
            description={`${job.min_salary} ${job.currency || "sar"} -${job.max_salary} ${
              job.currency || "sar"
            } /MONTH`}
          />
        )}
        {
          <InfoItem
            icon={<Briefcase />}
            title="EXPERIENCE"
            description={`${job.experience_from} - ${job.experience_to} Years `}
          />
        }
        {job.branch?.country?.title && job.branch?.state?.title && (
          <InfoItem
            icon={<GoLocation className=" w-5 h-5" />}
            title="LOCATION"
            description={`${job.branch?.country?.title || ""}, ${job.branch?.state?.title || ""} , ${
              job.branch?.city?.title || ""
            }`}
          />
        )}
        {job.company_id && (
          <InfoItem
            icon={<EarthIcon className=" w-5 h-5" />}
            title="COMPANY ID"
            description={job.company_id || "NOT SPECIFIED"}
          />
        )}
      </div>
    </div>
  );
};

export default JobInfo;
