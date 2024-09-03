import MiniTitle from "@/app/components/MiniTitle";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CheckCircle, EditIcon } from "lucide-react";
import Link from "next/link";

const jobs = [
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
import React from "react";
import FunctionalButton from "@/app/components/FunctionalButton";
import { PaginationDemo } from "@/app/components/Pagination";

const page = () => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex md:flex-row flex-col gap-4 items-start justify-between">
        <MiniTitle boldness="bold" size="lg" className="   uppercase" text="RECENTLY POSTED JOB OFFERS" />
        <FunctionalButton link="/dashboard/add-job-offer" btnText="ADD JOB OFFER" />
      </div>
      <Table className=" lg:table flex flex-col w-full">
        <TableHeader className=" w-full  rounded-xl bg-light">
          <TableRow>
            <TableHead className="  w-[35%]">JOBS</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[25%]">OFFER DATE</TableHead>
            <TableHead className="">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, i) => (
            <TableRow className="  lg:table-row w-full flex items-start  flex-wrap " key={i}>
              <TableCell className="font-medium w-full lg:w-fit">
                <div className=" flex flex-col items-start">
                  <h1 className=" text-gray-900 font-semibold">{job.title}</h1>
                  <div className=" flex items-center gap-3 text-muted-foreground">
                    <span>{job.duration}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="  gap-1  my-auto  text-sm text-green-500">
                <div className="  flex items-center  justify-center gap-2">
                  <CheckCircle className=" text-green-500 w-4 h-4" />
                  <p className=" text-xs font-semibold"> {job.STATUS}</p>
                </div>
              </TableCell>

              <TableCell className="  gap-1 mr-auto my-auto  text-sm ">
                <div className="  flex  gap-2">
                  <Calendar className=" w-4 h-4" /> <p className=" text-xs font-semibold"> {job.date}</p>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center gap-2">
                  <Button
                    size={"lg"}
                    className=" font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                  >
                    DOWNLOAD OFFER
                  </Button>
                  <Link href={"/dashboard/add-jpb-offer/1"} className=" ml-auto bg-gray-200 rounded-full p-2">
                    <EditIcon />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationDemo />
    </div>
  );
};

export default page;
