import Applicant from "@/app/components/Applicant";
import Filters from "@/app/components/Filters";
import GridContainer from "@/app/components/defaults/GridContainer";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { PaginationDemo } from "@/app/components/Pagination";
import Sort from "@/app/components/Sort";
import React, { Suspense } from "react";
import FilterMobile from "@/app/components/FilterPhone";
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
      <GridContainer className="gap-4" cols={9}>
        <div className=" col-span-2 lg:col-span-3">
          <div className=" lg:block hidden ">
            <Filters />
          </div>
          <FilterMobile />
        </div>
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <div className="flex items-start justify-between">
            <MiniTitle boldness="normal" size="lg" color=" text-muted-foreground" text="550+ EMPLOYEES AVAILABLE" />
            <Sort options={["latest", "earliest"]} />
          </div>
          {doctors.map((doc) => (
            <Applicant notification show={false} key={doc.name} applicant={doc} />
          ))}
          <PaginationDemo />
        </div>
      </GridContainer>
    </div>
  );
};

export default page;
