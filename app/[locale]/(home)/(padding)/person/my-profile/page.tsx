"use client";
import Education from "@/app/components/Education";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import InfoItem from "@/app/components/InfoDoc";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Tabing from "@/app/components/Tabing";
import { Briefcase, DollarSign, EditIcon, HeartIcon, LanguagesIcon, Paperclip } from "lucide-react";
import React, { startTransition } from "react";
import { redirect } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { formatDate } from "date-fns";
import { convertToHTML } from "@/lib/utils";
import Container from "@/app/components/Container";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import UserCard from "@/app/components/UserCard";
import { DashboardIcon } from "@radix-ui/react-icons";

import BreadCrumb from "@/app/components/BreadCrumb";
import Paragraph from "@/app/components/defaults/Paragraph";
import { GoLocation, GoPeople } from "react-icons/go";
import { Server } from "@/app/main/Server";
import CVdownload from "@/app/components/CVdownload";
import { useAuth } from "@/app/context/AuthContext";
import VerificationStatus from "@/app/components/VerficationStatus";
import AboutPerson from "@/app/components/AboutPerson";

const page = () => {
  const { data, isLoading } = useGetEntity("my-profile", "my-profile");
  const { userSettings, loading } = useAuth();
  if (isLoading || !data || loading) return <Spinner />;
  else if (!data.data && !isLoading) redirect("/person/create-profile");
  const dataPage = data.data;
  const { description, educations, main_educations } = data.data;
  console.log(data);
  const education = [...educations, ...main_educations];
  console.log(education, dataPage);
  return (
    <section className=" pt-36">
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: "/person", text: "Dashboard" },
          { href: "/person/my-profile", text: "My Profile" },
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
            <div className="flex  justify-end  items-center gap-2">
              <CVdownload name={dataPage?.name} />
              <FunctionalButton
                className=" w-full"
                btnText="EDIT"
                icon={<EditIcon className=" w-5 h-5" />}
                link="/person/edit-my-profile"
              />
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" order-2 lg:order-[0] col-span-2 lg:col-span-6">
            {" "}
            <AboutPerson previousExperiences={"previous_experiences"} dataPage={dataPage} education={education} />
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <MiniTitle color="black" text="MY INFO" />
            <VerificationStatus className="!px-0" verification_type={userSettings.verification_type || ""} />
            <div className=" flex flex-col gap-5">
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="SPECIALITY"
                description={dataPage?.career_specialty?.title || "Unknown"}
              />{" "}
              <InfoItem
                icon={<DollarSign className=" w-5 h-5" />}
                title="SALARY EXPECTATIONS"
                description={`${dataPage?.min_salary} ${dataPage?.currenc || ""} -${dataPage?.max_salary} ${
                  dataPage?.currency || ""
                } /MONTH`}
              />
              <InfoItem
                icon={<Briefcase className=" w-5 h-5" />}
                title="YEARS OF EXPERIENCE"
                description={`${Math.ceil(dataPage?.years_of_experience) || 0} years`}
              />
              <InfoItem
                icon={<HeartIcon className=" w-5 h-5" />}
                title="FAMILY STATUS"
                description={dataPage?.family_status || "Unknown Department"}
              />
              <InfoItem
                icon={<GoPeople className=" w-5 h-5" />}
                title="GENDER"
                description={dataPage?.gender || "Unknown Department"}
              />
              <InfoItem
                icon={<LanguagesIcon className=" w-5 h-5" />}
                title="NATIONALITY"
                description={dataPage?.nationality?.title || "Unknown Department"}
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
