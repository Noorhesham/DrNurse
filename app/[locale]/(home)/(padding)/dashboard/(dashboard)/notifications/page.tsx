import Applicant from "@/app/components/Applicant";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import Notification from "@/app/components/defaults/Notification";
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
];
const page = () => {
  return (
    <div className=" flex  flex-col gap-8">
      <MiniTitle size="2xl" boldness="bold" color=" text-main2" text="Notifications" />
      {doctors.map((doc) => (
        <Notification notification={doc} show={false} key={doc.name} />
      ))}
    </div>
  );
};

export default page;
