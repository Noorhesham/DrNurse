"use client";

import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import InfoItem from "@/app/components/InfoDoc";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";

import { Briefcase, CalendarIcon, EditIcon, GraduationCapIcon } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { convertToHTML } from "@/lib/utils";
import { GoPeople } from "react-icons/go";
import VerificationStatus from "@/app/components/VerficationStatus";
import { useAuth } from "@/app/context/AuthContext";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("company", `company-${id}`, `${id}`);
  if (isLoading || !data) return <Spinner />;
  const {
    title,
    description,

    company_size,
    year_founded,

    branches_count,
    logo,
    business,
    verification_type,
    branches,
  } = data.data;
  const hospital = {
    name: title,
    image: logo?.[0]?.file || "/nanana.svg",

    address: branches.length > 0 ? `${branches?.[0].country?.title}, ${branches?.[0].city?.title}` : "",
  };
  console.log(data);
  return (
    <section>
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile user={hospital}>
            <div className="flex  justify-end  items-center gap-2">
              <FunctionalButton
                className=" flex-1 lg:w-fit w-full"
                btnText="EDIT"
                icon={<EditIcon className=" w-5 h-5" />}
                link={`/dashboard/${id}/profile-settings`}
              />
              <FunctionalButton
                className=" flex-1 lg:w-fit w-full"
                btnText="EDIT MANAGERS"
                icon={<EditIcon className=" w-5 h-5" />}
                link={`/dashboard/${id}/control-managers`}
              />
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className=" ">
        <GridContainer className=" gap-8" cols={8}>
          <div className=" order-2 lg:order-[0] col-span-2 lg:col-span-6">
            {description && (
              <section className=" flex flex-col gap-2 ">
                <MiniTitle boldness="bold" color=" text-main2" text="ABOUT ME" />{" "}
                {
                  <div
                    dangerouslySetInnerHTML={{ __html: convertToHTML(description || "") }}
                    className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
                  />
                }
              </section>
            )}
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <div className=" flex justify-between items-center gap-4">
              <div className="flex text-sm items-center">
                <MiniTitle color="black" text="OVERVIEW" />
              </div>
            </div>
            <MiniTitle color="black" text="HOSPITAL INFO" />
            <VerificationStatus className="!px-0" verification_type={verification_type} />

            <div className="  flex flex-col gap-5">
              <InfoItem icon={<Briefcase className=" w-5 h-5" />} title="BUSINESS TYPE" description={business} />
              <InfoItem icon={<CalendarIcon className=" w-5 h-5" />} title="YEAR FOUNDED" description={year_founded} />
              <InfoItem icon={<GoPeople className=" w-5 h-5" />} title="COMPANY SIZE" description={company_size} />
              <InfoItem 
                icon={<GraduationCapIcon className=" w-5 h-5" />}
                title="BRANCHES COUNT"
                description={branches_count}
              />
            </div>
          </div>
        </GridContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
