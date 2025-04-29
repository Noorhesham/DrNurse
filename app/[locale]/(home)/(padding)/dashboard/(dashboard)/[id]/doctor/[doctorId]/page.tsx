"use client";

import MeetingForm from "@/app/components/forms/MeetingForm";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import InfoItem from "@/app/components/InfoDoc";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";

import { Briefcase, CalendarIcon, DollarSign, HeartIcon, LanguagesIcon } from "lucide-react";
import React from "react";

import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";

import { GoLocation, GoPeople } from "react-icons/go";
import { DashboardIcon } from "@radix-ui/react-icons";
import BreadCrumb from "@/app/components/BreadCrumb";
import { useSearchParams } from "next/navigation";
import { ACTIVE_LISCNECE_COUNTRY } from "@/app/constants";
import AboutPerson from "@/app/components/AboutPerson";

const page = ({ params: { doctorId, id } }: { params: { doctorId: string; id: string } }) => {
  const { data, isLoading } = useGetEntity("doctor", `doctor-${doctorId}`, doctorId);
  const searchPrams = useSearchParams();
  if (isLoading || !data) return <Spinner />;

  const dataPage = data.data;
  const education = [...dataPage?.main_education, ...dataPage?.education];
  console.log(education, dataPage);

  return (
    <section>
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: `/dashboard/${id}`, text: "Dashboard" },
          {
            href: searchPrams.get("job")
              ? `/dashboard/${id}/jobs/applications/${searchPrams.get("job") || "0"}`
              : `/dashboard/${id}/employees`,
            text: searchPrams.get("job") ? "APPLICANTS" : "EMPLOYEES",
          },
          { href: `/dashboard/${id}/doctor/${doctorId}`, text: dataPage?.name },
        ]}
      />
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile
            user={{
              name: dataPage?.name,
              image: dataPage?.avatar,
              speciality: dataPage?.current_job_title || "",
              address: `${dataPage?.current_location?.title}`,
            }}
          >
            <div className="flex  justify-center  items-center gap-2">
              <FunctionalButton
                btnText="SCHEDULE MEETING"
                icon={<CalendarIcon className=" w-5 h-5" />}
                content={<MeetingForm userId={dataPage?.user_id} invite={true} />}
              />
              <FunctionalButton
                btnText="SEND JOB OFFER"
                icon={<Briefcase className=" w-5 h-5" />}
                link={`/dashboard/${id}/add-job-offer?userId=${dataPage?.id}`}
              />
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            {" "}
            <AboutPerson dataPage={dataPage} education={education} />
          </div>
          <div className="flex h-fit col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <MiniTitle color="black" text="EMPLOYEE INFO" />
            <div className=" flex flex-col gap-5">
              <InfoItem
                icon={<CalendarIcon className=" w-5 h-5" />}
                title="AVAILABILITY"
                description={dataPage?.available ? dataPage.start_availability_at : "Not Available"}
              />
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="TYPE"
                description={dataPage?.career_type?.title || "Unknown"}
              />
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="SPECIALITY"
                description={dataPage?.career_Specialty?.title || dataPage?.career_specialty?.title || "Unknown"}
              />
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="LEVEL"
                description={dataPage?.career_level?.title || "Unknown"}
              />{" "}
              <InfoItem
                icon={<LanguagesIcon className=" w-5 h-5" />}
                title="ACTIVE LISCENCE COUNTRY"
                description={
                  ACTIVE_LISCNECE_COUNTRY.find((item: any) => item.value === dataPage?.active_license_country)?.label ||
                  dataPage?.active_license_country ||
                  "Unknown"
                }
              />
              {dataPage.show_expected_salary === 1 && (
                <InfoItem
                  icon={<DollarSign className=" w-5 h-5" />}
                  title="SALARY EXPECTATIONS"
                  description={`${dataPage.min_salary} ${dataPage.currency} -${dataPage.max_salary} ${dataPage.currency} /MONTH`}
                />
              )}
              <InfoItem
                icon={<Briefcase className=" w-5 h-5" />}
                title="YEARS OF EXPERIENCE"
                description={`${Math.ceil(dataPage?.years_of_experience) || 0} years`}
              />
              <InfoItem
                icon={<HeartIcon className=" w-5 h-5" />}
                title="FAMILY STATUS"
                description={dataPage?.family_status || "Unknown"}
              />
              <InfoItem
                icon={<GoPeople className=" w-5 h-5" />}
                title="GENDER"
                description={dataPage?.gender || "Unknown Department"}
              />
              <InfoItem
                icon={<LanguagesIcon className=" w-5 h-5" />}
                title="NATIONALITY"
                description={dataPage?.nationality.title || "Unknown Department"}
              />
              <InfoItem
                icon={<GoLocation className=" w-6 h-6" />}
                title="CURRENT LOCATION"
                description={`${dataPage?.current_location?.title} , ${dataPage?.state?.title || ""} , ${
                  dataPage?.city?.title || ""
                }`}
              />
            </div>
          </div>
        </GridContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
