import React from "react";
import Doctor from "@/app/components/Doctor";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import SideBar from "@/app/components/nav/SideBar";
import SwiperCards from "@/app/components/SwiperCards";
import JobsTable from "@/app/components/tables/JobTable";
import OffersTable from "@/app/components/tables/OffersTable";
import Image from "next/image";

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
  { name: "Dr. Maria", image: "/doctor6.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
];
const jobs = [
  {
    name: "Mohamed M.General Practitioner in riyadh",
    hospital: "#Hospital : K123456789-25",
    salary: "3500 SAR - 5000 SAR",
    address: "Macca, Sudia Arabic",
  },
  {
    name: "Mohamed M.General Practitioner in riyadh",
    hospital: "#Hospital : K123456789-25",
    salary: "3500 SAR - 5000 SAR",
    address: "Macca, Sudia Arabic",
  },
  {
    name: "Mohamed M.General Practitioner in riyadh",
    hospital: "#Hospital : K123456789-25",
    salary: "3500 SAR - 5000 SAR",
    address: "Macca, Sudia Arabic",
  },
];
const offers = [
  {
    title: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
  },

  {
    title: "Junior Surgeon",
    date: "20 Dec 2024",

    duration: "27 days remaing",
    STATUS: "ACTIVE",
  },

  {
    title: "Senior Specialty Nurse",

    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },

  {
    title: "bstetric and Gynecology Nurse",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },
  {
    title: "bstetric and Gynecology Nurse",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },
  {
    title: "bstetric and Gynecology Nurse",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },
  {
    title: "bstetric and Gynecology Nurse",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },
  {
    title: "bstetric and Gynecology Nurse",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    date: "20 Dec 2024",
  },
];

const Page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col lg:grid lg:grid-cols-8 gap-5">
        <SideBar person />
        <section className="col-span-6">
          <div className="flex mb-5 justify-between">
            <div className="flex text-main2 font-semibold flex-col">
              <span className="text-xl tracking-widest">HELLO,</span>
              <MiniTitle boldness="bold" size="2xl" color="text-main2" className="-mt-2 uppercase" text="AHMED ALI" />
              <p className="text-gray-700 font-normal capitalize tracking-wider">
                Here is your daily activities and applications
              </p>
            </div>
          </div>
          <div className="flex gap-2   flex-col">
            <MiniTitle
              link="#"
              className="capitalizes"
              boldness="bold"
              color="text-gray-900"
              text="Recently Posted Jobs"
            />
            <JobsTable jobs={jobs} />
          </div>
          <div className=" flex flex-col gap-2">
            <MiniTitle link="#" className="capitalizes" boldness="bold" color="text-gray-900" text="Offers" />
            <OffersTable offers={offers} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 my-4 gap-5">
            <div className="flex col-span-2 flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
              <MiniTitle boldness="bold" text="RECENTLY MEETINGS" />
              <Meet />
              <Meet />
              <Meet />
              <Meet />
            </div>
            <div className=" col-span-3 relative w-full h-96">
              <Image src={"/find.jpg"} alt={"doctor"} fill className={"object-cover rounded-2xl"} />
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
