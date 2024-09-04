import CompanyInfo from "@/app/components/CompanyInfo";
import FunctionalButton from "@/app/components/FunctionalButton";
import JobCard from "@/app/components/JobCard";
import MainProfile from "@/app/components/MainProfile";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const doctor = {
  name: "Mohamed M.",
  image: "/doctor1.png",
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
            <div className="flex  items-center gap-2">
              <FunctionalButton
                btnText="APPLY FOR JOB"
                icon={null}
                content={
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <FaExclamationCircle size={40} className=" text-main" />
                    <h2 className=" text-main text-lg font-semibold">SORRY !</h2>
                    <p className=" max-w-md text-center  text-base">
                      {" "}
                      YOUR PROFILE IS INCOMPLETE OR NOT YET ACTIVATED. PLEASE REVIEW YOUR PROFILE TO APPLY FOR THIS JOB
                    </p>
                    <div className="flex  gap-2">
                      <Link href="/person/edit-my-profile">
                        {" "}
                        <Button size="sm" className="rounded-full">
                          UPDATE PROFILE
                        </Button>
                      </Link>
                      <DialogClose asChild>
                        <Button size="sm" className="rounded-full">
                          Close
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                }
              />
              <Link href="/person/bookmarked-jobs">
                {" "}
                <Button variant={"outline"} size="sm" className="rounded-full">
                  <BookmarkIcon />
                </Button>
              </Link>
            </div>
          </MainProfile>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <CompanyInfo job={{}} />
        <section>
          <MiniTitle boldness="bold" color=" text-main2" text="RELATED JOBS" />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
