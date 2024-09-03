import Doctor from "@/app/components/Doctor";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/GridContainer";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Meet from "@/app/components/Meet";
import MiniTitle from "@/app/components/MiniTitle";
import SideBar from "@/app/components/SideBar";
import SwiperCards from "@/app/components/SwiperCards";
import TableData from "@/app/components/TableData";
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
  { name: "Dr. Maria", image: "/doctor6.png", speciality: "Dentist", address: "Nairobi, Kenya", duration: "in 7 days" },
];
const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="  flex flex-col lg:grid lg:grid-cols-9 gap-4 lg:gap-8">
        <SideBar />
        <section className=" col-span-7">
          <div className=" flex md:flex-row flex-col md:gap-0 gap-3 md:mb-0 mb-2  justify-between">
            <div className="flex text-main2 font-semibold flex-col ">
              <span className=" text-xl tracking-widest">HELLO,</span>
              <MiniTitle
                boldness="extraBold"
                size="lg"
                color=" text-main2"
                className=" -mt-2 text-main2  uppercase"
                text="National university health system"
              />
              <p className=" text-gray-700 font-normal capitalize tracking-wider">
                Here is your daily activities and applications
              </p>
            </div>
            <FunctionalButton btnText="POST A JOB" link="/dashboard/1/post-job" />
          </div>
          <div className=" mt-2 gap-2 flex flex-col">
            <MiniTitle
              link="#"
              className=" capitalizes"
              boldness="bold"
              color=" text-gray-900"
              text="Recently Posted Jobs"
            />
            <TableData />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 my-4 gap-5">
            <div className=" flex flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
              <MiniTitle boldness="bold" text="RECENTLY MEETINGS" />
              <Meet />
              <Meet />
              <Meet />
              <Meet />
            </div>
            <div className=" flex flex-col gap-4 bg-[#F7F9FB] px-5 py-5 rounded-lg">
              <MiniTitle link="#" boldness="bold" text="Recently Proposed persons" />
              <div className=" md:block hidden">
                <GridContainer cols={3}>
                  {doctors.map((doctor) => (
                    <Doctor doctor={doctor} />
                  ))}
                </GridContainer>
              </div>
              <div className=" block md:hidden ">
                <SwiperCards
                  autoplay
                  className=" w-full h-full"
                  slidesPerView={2}
                  samePhone
                  items={doctors.map((doctor, i) => ({
                    card: <Doctor key={i} doctor={doctor} />,
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
