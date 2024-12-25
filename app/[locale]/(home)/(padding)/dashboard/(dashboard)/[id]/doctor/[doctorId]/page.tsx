"use client";
import AboutDoctor from "@/app/components/AboutDoctor";
import Education from "@/app/components/Education";
import MeetingForm from "@/app/components/forms/MeetingForm";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import InfoItem from "@/app/components/InfoDoc";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Paragraph from "@/app/components/defaults/Paragraph";
import SateChange from "@/app/components/SateChange";
import Tabing from "@/app/components/Tabing";
import { Briefcase, CalendarIcon, DollarSign, HeartIcon, LanguagesIcon } from "lucide-react";
import React from "react";
import { Server } from "@/app/main/Server";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { convertToHTML } from "@/lib/utils";
import { formatDate } from "date-fns";
import UserCard from "@/app/components/UserCard";
import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import Container from "@/app/components/Container";
import { GoLocation, GoPeople } from "react-icons/go";
import { DashboardIcon } from "@radix-ui/react-icons";
import BreadCrumb from "@/app/components/BreadCrumb";
import { useSearchParams } from "next/navigation";

const page = ({ params: { doctorId, id } }: { params: { doctorId: string; id: string } }) => {
  const { data, isLoading } = useGetEntity("doctor", `doctor-${doctorId}`, doctorId);
  const searchPrams = useSearchParams();
  if (isLoading || !data) return <Spinner />;

  const dataPage = data.data;
  const education = [...dataPage?.main_education, ...dataPage?.education];
  console.log(data);
  return (
    <section>
      <BreadCrumb
        linksCustom={[
          { href: "", text: "Home" },
          { href: `/dashboard/${id}`, text: "Dashboard" },
          { href: `/dashboard/${id}/jobs/applications/${searchPrams.get("job") || "0"}`, text: "APPLICANTS" },
          { href: `/dashboard/${id}/doctor/${doctorId}`, text: dataPage?.name },
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
                dataPage?.career_Specialty?.title || dataPage?.career_specialty?.title,
                dataPage?.career_level?.title,
              ]
                .filter(Boolean)
                .join(", "),
              address: `${dataPage?.current_location?.title}`,
              duration: "in 7 days",
            }}
          >
            <div className="flex  justify-center  items-center gap-2">
              <FunctionalButton
                btnText="SCHEDULE MEETING"
                icon={<CalendarIcon className=" w-5 h-5" />}
                content={<MeetingForm userId={dataPage?.user_id} invite={true} />}
              />
              <FunctionalButton
                btnText="SEND INITIAL OFFER"
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
            <Tabing
              defaultValue="about-me"
              options={[
                {
                  href: "about-me",
                  label: "ABOUT ME",
                  content: (
                    <div
                      dangerouslySetInnerHTML={{ __html: convertToHTML(dataPage.description || "") }}
                      className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
                    />
                  ),
                },
                {
                  href: "education",
                  label: "EDUCATION",
                  content: (
                    <section className="flex flex-col gap-4 ">
                      {education.length > 0 ? (
                        education?.map((edu: any, index: any) => (
                          <Education
                            key={index}
                            edu={{
                              image: "/Vector (10).svg",
                              name: [
                                edu.training_center || edu.university_name || "",
                                ` ${edu.certificate_name || ""}`,
                              ].filter(Boolean),
                              speciality: [edu.specialty?.title || "", edu?.career_specialty?.title || ""]
                                .filter(Boolean)
                                .join(", "),
                              date: edu.date,
                              address: edu?.country?.title || "",
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
                      {dataPage?.previousExperiences.length > 0 ? (
                        dataPage?.previousExperiences?.map((experience: any) => (
                          <Container key={experience.id} className="bg-gradient-to-r from-light to-white duration-150 ">
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
                                  {experience?.career_specialty?.title}{" "}
                                  {`${experience?.career_level ? `, ${experience?.career_level}` : ""}`}
                                </p>
                                <span className=" text-sm">
                                  {experience.from && formatDate(experience.from, "MMM yyyy")} -
                                  {experience.to ? formatDate(experience.to, "MMM yyyy") : "Present"}
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
            <MiniTitle color="black" text="EMPLOYEE INFO" />
            <div className=" flex flex-col gap-5">
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="Type"
                description={dataPage?.career_type?.title || "Unknown"}
              />
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="SPECIALITY"
                description={dataPage?.career_Specialty?.title || dataPage?.career_specialty?.title || "Unknown"}
              />
              <InfoItem
                icon={<DashboardIcon className=" w-5 h-5" />}
                title="Level"
                description={dataPage?.career_level?.title || "Unknown"}
              />{" "}
              <InfoItem
                icon={<LanguagesIcon className=" w-5 h-5" />}
                title="ACTIVE LISCENCE COUNTRY"
                description={dataPage?.active_license_country || "Unknown"}
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
                description={`${dataPage?.current_location?.title},${dataPage?.state?.title || ""},${
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
