import Applicant from "@/app/components/Applicant";
import Container from "@/app/components/Container";
import Filters from "@/app/components/Filters";
import FlexWrapper from "@/app/components/FlexWrapper";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/GridContainer";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import MiniTitle from "@/app/components/MiniTitle";
import { PaginationDemo } from "@/app/components/Pagination";
import Sort from "@/app/components/Sort";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { EditIcon, FolderSync, Lock } from "lucide-react";
import React from "react";
const doctors = [
  {
    name: "Mohamed M.",
    image: "/doctor1.png",
    speciality: "Dentist",
    address: "Nairobi, Kenya",
    duration: "in 7 days",
  },
  { name: "Dr. Maria", image: "/doctor2.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor3.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor4.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor5.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
  { name: "Dr. Maria", image: "/doctor6.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
];
const page = () => {
  return (
    <div className="flex flex-col">
      <Container className="  bg-light">
        <FlexWrapper max={false} className=" justify-between px-0">
          <div className=" flex gap-1 flex-col items-start">
            <Head1 size="sm" text="General Practitioner" />
            <p className=" text-muted-foreground uppercase">National university health system</p>
            <div className=" flex items-center gap-2">
              <Location />
              <p>Mecca, Sudia Arabic</p>
            </div>
          </div>
          <div className="flex  items-center gap-3">
            <FunctionalButton btnText="Edit" icon={<EditIcon />} link="#" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className=" bg-gray-300 text-main2  p-2 rounded-xl">
                    <FolderSync />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Locked</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className=" bg-red-300 text-gray-800  p-2  rounded-xl">
                    <Lock />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Locked</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </FlexWrapper>
      </Container>
      <GridContainer className=" mt-5 gap-4" cols={8}>
        <div className=" col-span-2 lg:col-span-3">
          <Filters />
        </div>
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-5">
          <div className="flex items-start justify-between">
            <MiniTitle boldness="normal" size="lg" color=" text-muted-foreground" text="550+ EMPLOYEES AVAILABLE" />
            <Sort options={["latest", "earliest"]} />
          </div>
          {doctors.map((doc) => (
            <Applicant show={false} key={doc.name} applicant={doc} />
          ))}
          <PaginationDemo />
        </div>
      </GridContainer>
    </div>
  );
};

export default page;
