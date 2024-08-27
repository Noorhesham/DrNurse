import Applicant from "@/app/components/Applicant";
import Education from "@/app/components/Education";
import MeetingForm from "@/app/components/forms/MeetingForm";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/GridContainer";
import InfoItem from "@/app/components/InfoDoc";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MiniTitle from "@/app/components/MiniTitle";
import Paragraph from "@/app/components/Paragraph";
import SateChange from "@/app/components/SateChange";
import Tabing from "@/app/components/Tabing";
import { Briefcase, BriefcaseIcon, CalendarIcon, EditIcon, HeartIcon, LanguagesIcon } from "lucide-react";
import React from "react";
const doctor = {
  name: "Mohamed M.",
  image: "/edu.png",
  speciality: "Dentist",
  address: "Nairobi, Kenya",
  duration: "in 7 days",
};
const page = () => {
  return (
    <section>
      <div className=" bg-light ">
        <MaxWidthWrapper>
          <MainProfile user={doctor}>
            <div className="flex flex-wrap items-center gap-2">
              <FunctionalButton btnText="EDIT" icon={<EditIcon />} link={"/dashboard/profile-settings"} />
              <FunctionalButton btnText="EDIT MANAGERS" icon={<EditIcon />} link="/dashboard/control-managers" />
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <GridContainer className=" gap-8" cols={8}>
          <div className=" col-span-2 lg:col-span-6">
            <section className=" flex flex-col gap-2 ">
              <MiniTitle boldness="bold" color=" text-main2" text="ABOUT ME" />
              <Paragraph
                full
                description="Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet."
              />
              <div className=" flex  items-start flex-col gap-3">
                <MiniTitle boldness="bold" color=" text-main2" text="SKILLS" />
                <ul className=" mx-4  list-disc">
                  <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                  <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                  <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                  <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                </ul>
              </div>
            </section>
          </div>
          <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
            <div className=" flex justify-between items-center gap-4">
              <div className="flex text-sm items-center">
                <MiniTitle color="black" text="STATES" />
                <h3> :ARCHIVE</h3>
              </div>
              <SateChange size="sm" />
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
