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

const page = () => {
  const { data, isLoading } = useGetEntity("my-profile", "my-profile");
  if (isLoading || !data) return <Spinner />;
  else if (!data.data && !isLoading) redirect("/person/create-profile");
  const dataPage = data.data;
  const { description } = data.data;
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
              speciality: [
                dataPage?.career_type?.title,
                dataPage?.career_specialty?.title,
                dataPage?.career_level?.title,
              ]
                .filter(Boolean)
                .join(", "),
              address: `${dataPage?.current_location?.title}`,
              duration: "in 7 days",
            }}
          >
            <div className="flex  justify-end  items-center gap-2">
              <CVdownload/>
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
            <Tabing
              defaultValue="about-me"
              options={[
                {
                  href: "about-me",
                  label: "About Me",
                  content: (
                    <div
                      dangerouslySetInnerHTML={{ __html: convertToHTML(description || "") }}
                      className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
                    />
                  ),
                },
                {
                  href: "education",
                  label: "EDUCATION",
                  content: (
                    <section className="flex flex-col gap-4 ">
                      {dataPage.educations.length > 0 ? (
                        dataPage.educations?.map((edu: any, index: any) => (
                          <Education
                            key={index}
                            edu={{
                              image: "/Vector (10).svg",
                              name: `${edu.training_center} , ${edu.certificate_name}`,
                              speciality: [
                                dataPage?.career_type?.title,
                                dataPage?.career_specialty?.title,
                                dataPage?.career_level?.title,
                              ]
                                .filter(Boolean)
                                .join(", "),
                              date: edu.date,
                              address: edu?.country?.title,
                            }}
                          />
                        ))
                      ) : (
                        <Paragraph description="No Education Found" />
                      )}
                    </section>
                  ),
                },
                {
                  href: "experiences",
                  label: "EXPERIENCES",
                  content: (
                    <section className="flex flex-col gap-4">
                      {dataPage?.previous_experiences.length > 0 ? (
                        dataPage?.previous_experiences?.map((experience: any) => (
                          <Container className="bg-gradient-to-r from-light to-white duration-150 ">
                            <FlexWrapper max={false} className="  items-center  justify-between">
                              <UserCard
                                edu={true}
                                show={false}
                                applicant={{
                                  name: experience.name,
                                  image: "/Experience.svg",
                                  address: experience?.country?.title,
                                }}
                              />
                              <div className=" ml-auto self-end   font-medium text-gray-600">
                                <p className=" lg:text-base text-sm  font-semibold uppercase">
                                  {[experience?.career_specialty?.title, experience?.career_level?.title]
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                                <span className=" text-sm">
                                  {formatDate(experience.from, "dd MMM yyyy")}-
                                  {formatDate(experience.to, "dd MMM yyyy")}
                                </span>
                              </div>
                            </FlexWrapper>
                          </Container>
                        ))
                      ) : (
                        <Paragraph description="No Experiences Found" />
                      )}
                    </section>
                  ),
                },
              ]}
            />
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <MiniTitle color="black" text="MY INFO" />

            <div className=" flex flex-col gap-5">
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="SPECIALITY"
                description={dataPage?.career_specialty?.title || "Unknown"}
              />{" "}
              <InfoItem
                icon={<DollarSign className=" w-5 h-5" />}
                title="SALARY EXPECTATIONS"
                description={`${dataPage.min_salary} ${dataPage.currency} -${dataPage.max_salary} ${dataPage.currency} /MONTH`}
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
                description={dataPage?.nationality.title || "Unknown Department"}
              />
              <InfoItem
                icon={<GoLocation className=" w-6 h-6" />}
                title="CURRENT LOCATION"
                description={`${dataPage?.current_location.title},${dataPage?.state?.title || ""},${
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
