import React from "react";
import GridContainer from "./defaults/GridContainer";
import MiniTitle from "./defaults/MiniTitle";
import Paragraph from "./defaults/Paragraph";
import { Button } from "@/components/ui/button";
import InfoItem from "./InfoDoc";
import {
  BookmarkIcon,
  Briefcase,
  BriefcaseIcon,
  CalendarIcon,
  EditIcon,
  GraduationCapIcon,
  HeartIcon,
  LanguagesIcon,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaExclamationCircle, FaFacebook, FaPinterest } from "react-icons/fa";
import { convertToHTML } from "@/lib/utils";
import { GoPeople } from "react-icons/go";

const CompanyInfo = ({ hospital, job }: { hospital?: any; job?: any }) => {
  const {
    title,
    description,

    company_size,
    year_founded,

    branches_count,
    logo,
    business,
  } = hospital;
  return (
    <GridContainer className=" gap-8" cols={8}>
      <div className=" order-2 lg:order-[0] col-span-2 lg:col-span-6">
        <section className=" flex flex-col gap-2 ">
          <MiniTitle boldness="bold" color=" text-main2" text="ABOUT ME" />
          <div
            dangerouslySetInnerHTML={{ __html: convertToHTML(description) }}
            className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
          />
        </section>
      </div>
      <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
        <div className=" flex justify-between items-center gap-4">
          <div className="flex text-sm items-center">
            <MiniTitle color="black" text="OVERVIEW" />
          </div>
        </div>
        <MiniTitle color="black" text="HOSPITAL INFO" />

        <div className="  flex flex-col gap-5">
          <InfoItem icon={<CalendarIcon className=" w-5 h-5" />} title="YEAR FOUNDED" description={year_founded} />
          <InfoItem icon={<GoPeople className=" w-5 h-5" />} title="COMPANY SIZE" description={company_size} />
          <InfoItem
            icon={<GraduationCapIcon className=" w-5 h-5" />}
            title="branches count"
            description={branches_count}
          />
        </div>
      </div>
    </GridContainer>
  );
};

export default CompanyInfo;
