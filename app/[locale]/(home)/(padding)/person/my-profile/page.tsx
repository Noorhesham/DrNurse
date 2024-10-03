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
import { Briefcase, BriefcaseIcon, CalendarIcon, EditIcon, HeartIcon, LanguagesIcon, Paperclip } from "lucide-react";
import React from "react";
import { Server } from "@/app/main/Server";
import { redirect } from "next/navigation";
const doctor = {
  name: "Mohamed M.",
  image: "/doctor1.png",
  speciality: "Dentist",
  address: "Nairobi, Kenya",
  duration: "in 7 days",
};
const page = async () => {
  const res = await Server({ resourceName: "my-profile" });
  if (!res.status) redirect("/person/create-profile");
  console.log(res);
  return (
    <section>
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile user={doctor}>
            <div className="flex  justify-end  items-center gap-2">
              <FunctionalButton className=" w-full" btnText="DOWNLOAD CV" icon={<Paperclip />} link={"#"} />
              <FunctionalButton className=" w-full" btnText="EDIT" icon={<EditIcon />} link="/person/edit-my-profile" />
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
                  label: "About Me",
                  content: <AboutDoctor />,
                },
                {
                  href: "education",
                  label: "EDUCATION",
                  content: (
                    <section className="flex flex-col gap-4 ">
                      <Education
                        edu={{ image: "/edu.png", name: "Faculty of Medicine", speciality: "Ain Shams University" }}
                      />
                      <Education
                        edu={{ image: "/edu.png", name: "Faculty of Medicine", speciality: "Ain Shams University" }}
                      />
                    </section>
                  ),
                },
                {
                  href: "experiences",
                  label: "EXPERIENCES",
                  content: (
                    <section className="flex flex-col gap-4 ">
                      <Education
                        edu={{ image: "/edu.png", name: "Faculty of Medicine", speciality: "Ain Shams University" }}
                      />
                      <Education
                        edu={{ image: "/edu.png", name: "Faculty of Medicine", speciality: "Ain Shams University" }}
                      />
                      <Education
                        edu={{ image: "/edu.png", name: "Faculty of Medicine", speciality: "Ain Shams University" }}
                      />
                    </section>
                  ),
                },
              ]}
            />
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <div className=" flex justify-between items-center gap-4">
              <MiniTitle color="black" text="MY INFO" />
            </div>
            <MiniTitle color="black" text="EMPLOYEE INFO" />
            <div className=" flex flex-col gap-5">
              <InfoItem icon={<LanguagesIcon />} title="CAREER TYPE" description="NURSES" />
              <InfoItem icon={<BriefcaseIcon />} title="JOB ROLE" description="MANAGER" />
              <InfoItem icon={<HeartIcon />} title="DEPARTMENT" description="CARDIOLOGY" />
              <InfoItem icon={<LanguagesIcon />} title="CAREER TYPE" description="NURSES" />
              <InfoItem icon={<BriefcaseIcon />} title="JOB ROLE" description="MANAGER" />
              <InfoItem icon={<HeartIcon />} title="DEPARTMENT" description="CARDIOLOGY" />
              <InfoItem icon={<LanguagesIcon />} title="CAREER TYPE" description="NURSES" />
              <InfoItem icon={<BriefcaseIcon />} title="JOB ROLE" description="MANAGER" />
              <InfoItem icon={<HeartIcon />} title="DEPARTMENT" description="CARDIOLOGY" />
            </div>
          </div>
        </GridContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
