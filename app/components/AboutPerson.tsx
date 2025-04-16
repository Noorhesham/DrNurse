import { convertToHTML } from "@/lib/utils";
import React from "react";
import Tabing from "./Tabing";
import Education from "./Education";
import Paragraph from "./defaults/Paragraph";
import FlexWrapper from "./defaults/FlexWrapper";
import Container from "./Container";
import UserCard from "./UserCard";
import { formatDate } from "date-fns";

const AboutPerson = ({
  dataPage,
  education,
  previousExperiences = "previousExperiences",
}: {
  dataPage: any;
  education: any;
  previousExperiences?: string;
}) => {
  return (
    <div className=" order-2 lg:order-[0] col-span-2 lg:col-span-6">
      <Tabing
        defaultValue="about-me"
        options={[
          {
            href: "about-me",
            label: "ABOUT ME",
            content: (
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(dataPage.description || "") }}
                className={` text-black text-sm  font-medium my-2 leading-[1.7] `}
              />
            ),
          },
          {
            href: "education",
            label: "EDUCATION",
            content: (
              <section className="flex flex-col gap-4 ">
                {education.length > 0 ? (
                  education
                    ?.sort((a: any, b: any) => new Date(b.date) - new Date(a.date))
                    .map((edu: any, index: any) => (
                      <Education
                        key={index}
                        edu={{
                          image: "/Vector (10).svg",
                          name: `${
                            edu.certificate_name || edu.university_name
                              ? `${edu.certificate_name || edu.university_name || ""}, `
                              : ""
                          }${edu.training_center || ""}`.trim(),

                          speciality: [
                            edu?.specialty?.title || edu?.career_specialty?.title || dataPage?.career_type?.title,
                            // dataPage?.career_specialty?.title,
                            // dataPage?.career_level?.title,
                          ]
                            .filter(Boolean)
                            .join(", "),
                          date: (edu.date && edu?.date) || "",
                          dateTo: (edu.date_to && edu?.date_to) || "",
                          present: edu.present === 0 ? false : true,
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
                {dataPage[`${previousExperiences}`].length > 0 ? (
                  dataPage[`${previousExperiences}`].map((experience: any) => (
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
                        <div className=" mx-auto self-end !text-center  font-medium text-gray-600">
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
  );
};

export default AboutPerson;
