import React from "react";
import GridContainer from "./GridContainer";
import MiniTitle from "./MiniTitle";
import Paragraph from "./Paragraph";
import { Button } from "@/components/ui/button";
import InfoItem from "./InfoDoc";
import { BookmarkIcon, Briefcase, BriefcaseIcon, CalendarIcon, EditIcon, HeartIcon, LanguagesIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaExclamationCircle, FaFacebook, FaPinterest } from "react-icons/fa";

const CompanyInfo = ({ hospital, job }: { hospital?: any; job?: any }) => {
  return (
    <GridContainer className=" gap-8" cols={8}>
      <div className=" col-span-2 lg:col-span-6">
        <section className=" flex flex-col gap-2 ">
          <MiniTitle boldness="bold" color=" text-main2" text="ABOUT ME" />
          <Paragraph
            full
            description="Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet."
          />
          {job && (
            <div className=" flex  items-start flex-col gap-3">
              <MiniTitle boldness="bold" color=" text-main2" text="RESPONSIBILITIES" />
              <ul className=" mx-4  list-disc">
                <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
                <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
              </ul>
            </div>
          )}
          {job && (
            <div className=" flex items-center gap-2 mt-2">
              <p className=" font-medium">SHARE THIS JOB</p>
              <div className="flex items-center gap-2">
                <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                  <FaFacebook /> FACEBOOK
                </Button>
                <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                  <FaXTwitter /> TWITTER
                </Button>
                <Button className=" flex  px-4 items-center gap-2" variant={"outline"}>
                  <FaPinterest /> PINTREST
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
      <div className="flex col-span-full lg:col-span-2 px-5 py-5 pb-10 rounded-xl flex-col gap-3  bg-light">
        <MiniTitle color="black" text="OVERVIEW" />

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
  );
};

export default CompanyInfo;
