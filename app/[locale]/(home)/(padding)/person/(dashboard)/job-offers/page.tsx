import MiniTitle from "@/app/components/MiniTitle";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CheckCircle,  } from "lucide-react";

const jobs = [
  {
    title: "Anesthesiologist Doctor",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
    STATUS: "ACTIVE",
  },

  {
    title: "Junior Surgeon",
    date: "15 dEC 2024 Must be approved 7 days in advance ",

    STATUS: "ACTIVE",
  },

  {
    title: "Senior Specialty Nurse",

    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },

  {
    title: "bstetric and Gynecology Nurse",
    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },
  {
    title: "bstetric and Gynecology Nurse",
    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },
  {
    title: "bstetric and Gynecology Nurse",
    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },
  {
    title: "bstetric and Gynecology Nurse",
    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },
  {
    title: "bstetric and Gynecology Nurse",
    STATUS: "ACTIVE",
    date: "15 dEC 2024 Must be approved 7 days in advance ",
  },
];
import React from "react";
import FunctionalButton from "@/app/components/FunctionalButton";
import { PaginationDemo } from "@/app/components/Pagination";
import ModalCustom from "@/app/components/ModalCustom";

import MeetingActions from "@/app/components/forms/MeetingActions";

const page = () => {
  return (
    <div className="">
      <div className=" flex md:flex-row flex-col gap-4 items-start justify-between">
        <MiniTitle boldness="bold" size="lg" className="   uppercase" text="RECENTLY POSTED JOB OFFERS" />
        <FunctionalButton link="/dashboard/add-job-offer" btnText="ADD JOB OFFER" />
      </div>
      <Table className=" mt-5">
        <TableHeader className=" bg-light">
          <TableRow>
            <TableHead className="w-[35%]">JOBS</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[25%]">OFFER DATE</TableHead>
            <TableHead className="">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <div className=" flex flex-col items-start">
                  <h1 className=" text-gray-900 font-semibold">{job.title}</h1>
                </div>
              </TableCell>

              <TableCell className=" gap-1 text-sm text-green-500">
                <div className="  flex items-center gap-2">
                  <CheckCircle className=" text-green-500 w-4 h-4" />
                  <p className=" text-xs font-semibold"> {job.STATUS}</p>
                </div>
              </TableCell>

              <TableCell className=" flex items-start gap-2 ">
                <Calendar />
                {job.date}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center gap-2">
                  <Button
                    size={"sm"}
                    className=" font-semibold rounded-full bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                  >
                    DOWNLOAD OFFER
                  </Button>
                  <ModalCustom
                    btn={
                      <Button className=" rounded-full" size={"sm"}>
                        TAKE ACTION
                      </Button>
                    }
                    content={<MeetingActions />}
                  />
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
