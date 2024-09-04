import FlexWrapper from "@/app/components/defaults/FlexWrapper";
import FunctionalButton from "@/app/components/FunctionalButton";
import Head1 from "@/app/components/Head1";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperclipIcon } from "lucide-react";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MiniTitle from "@/app/components/defaults/MiniTitle";

const reedems = [
  {
    title: "Redeem points",
    date: "20 Dec 2024",
    points: "300 Points",
    purpose: "Get a surgery Book",
  },
  {
    title: "Redeem points",
    date: "20 Dec 2024",
    points: "300 Points",
    purpose: "Get a surgery Book",
  },
  {
    title: "Redeem points",
    date: "20 Dec 2024",
    points: "300 Points",
    purpose: "Get a surgery Book",
  },
  {
    title: "Redeem points",
    date: "20 Dec 2024",
    points: "300 Points",
    purpose: "Get a surgery Book",
  },
];
const page = () => {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <FlexWrapper max={false} className=" justify-between">
          <Head1 text="ABOUT POINTS PROGRAM" />
          <FunctionalButton
            icon={<PaperclipIcon />}
            btnText="CONDITIONS"
            content={
              <div className=" flex flex-col items-center gap-3">
                <MiniTitle boldness="bold" text="Conditions for the points system" color="text-main2" />
                <Paragraph
                  description="Dr.Nurse application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient.
[App Name] application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient.
[App Name] application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient.
Dr.Nurse application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient.
[App Name] application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient.
[App Name] application is an innovative recruitment platform that aims to connect job seekers with employers easily and effectively. The application provides a range of tools and features that facilitate the hiring process for both sides, making it faster and more efficient."
                />
              </div>
            }
          />
        </FlexWrapper>
        <Paragraph
          full
          description="About program I am pleased to reach out to you today to offer a job opportunity as a Surgical Nurse with us. Given your experience and outstanding skills in the field About program I am pleased to reach out to you today to offer a job opportunity as a Surgical Nurse with us. Given your experience and outstanding skills in the fields"
        />
      </div>
      <FlexWrapper max={false} className=" mt-10 justify-between">
        <div className=" flex w-full  flex-col gap-2">
          <Label>Invite a friend</Label>
          <Input
            className={` bg-white shadow-sm w-full `}
            placeholder={"https://referralrock.com/blog/referral-link/.."}
          />
        </div>
        <div className=" flex  w-full flex-col gap-2">
          <Label>Invite a friend</Label>
          <Input
            className={` bg-white shadow-sm w-full `}
            placeholder={"https://referralrock.com/blog/referral-link/.."}
          />
        </div>
      </FlexWrapper>
      <div className=" flex flex-col gap-2 mt-10">
        <FlexWrapper max={false} className=" justify-between">
          <Head1 text="54,271 Points" />
          <FunctionalButton icon={<PaperclipIcon />} btnText="REDEEM NOW" content={""} />
        </FlexWrapper>
        <Table className=" mt-2">
          <TableHeader className=" bg-light">
            <TableRow>
              <TableHead className="w-[35%]">Title</TableHead>
              <TableHead>Redeem Date</TableHead>
              <TableHead className="w-[25%]">Number of points</TableHead>
              <TableHead className="">Purpose of replacement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reedems.map((job, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div className=" flex flex-col items-start">
                    <h1 className=" text-gray-900 font-semibold">{job.title}</h1>
                  </div>
                </TableCell>

                <TableCell className="  gap-2 ">{job.date}</TableCell>
                <TableCell className=" text-main2 font-semibold  gap-2 ">{job.points}</TableCell>
                <TableCell className=" text-main2 font-semibold  gap-2 ">{job.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default page;
