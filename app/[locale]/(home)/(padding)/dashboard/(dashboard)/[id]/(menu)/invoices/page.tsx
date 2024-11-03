import FunctionalButton from "@/app/components/FunctionalButton";
import MiniTitle from "@/app/components/defaults/MiniTitle";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
const jobs = [
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
  {
    title: "Mohamed A. ",
    speciality: "Anesthesiologist Doctor",
    date: "20 Dec 2024",
    status: "completed",
    invoice: "250 SAR",
  },
];
const subs = [
  {
    title: "BASIC Plan",
    date: "20 Dec 2024",
    invoice: "100 SAR ",
    total: "50 MEETINGS",
    avilable: "28 MEETINGS",
  },
  {
    title: "BASIC Plan",
    date: "20 Dec 2024",
    invoice: "100 SAR ",
    total: "50 MEETINGS",
    avilable: "28 MEETINGS",
  },
  {
    title: "BASIC Plan",
    date: "20 Dec 2024",
    invoice: "100 SAR ",
    total: "50 MEETINGS",
    avilable: "28 MEETINGS",
  },
];
const page = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-main2 ">DOCTORS NAME</TableHead>
            <TableHead className=" text-main2 ">DATE</TableHead>
            <TableHead className=" text-main2 ">STATUS</TableHead>
            <TableHead className=" text-main2 ">INVOICE VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium flex flex-col gap-2">
                <MiniTitle boldness="bold" size="lg" color=" text-black" text={job.title} />
                <p className=" text-muted-foreground">{job.speciality}</p>
              </TableCell>
              <TableCell className="mr-auto md:ml-0 font-medium ">
                <p className=" text-muted-foreground">{job.date}</p>
              </TableCell>

              <TableCell className=" gap-1   text-sm">
                <div className="  flex  uppercase items-center gap-2">
                  {job.status === "completed" ? (
                    <div className="  flex items-center  justify-center gap-2">
                      <CheckCircle className=" text-green-500  md:w-4 w-2 h-2 md:h-4" />
                      <p className=" text-xs font-semibold"> {job.status}</p>
                    </div>
                  ) : (
                    <>
                      <XCircle className=" text-red-500 w-4 h-4" />
                      <p className="text-red-500 text-xs font-semibold"> {job.status}</p>
                    </>
                  )}
                </div>
              </TableCell>

              <TableCell className=" flex items-center gap-2 ">
                <p className=" text-main2 font-semibold">{job.invoice}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className=" flex flex-col gap-4 mt-10">
        <div className=" justify-between flex flex-wrap sm:flex-nowrap w-full">
          <MiniTitle boldness="bold" size="lg" color=" text-main2" text="SUBSCRIPTIONS" />
          <FunctionalButton link="/dashboard/invoices/subscriptions" btnText="Add Subscription" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-main2 ">Subscription type</TableHead>
              <TableHead className=" text-main2 ">Subscription Date</TableHead>
              <TableHead className=" text-main2 ">Subscription value</TableHead>
              <TableHead className=" text-main2 ">Total number of meetings </TableHead>
              <TableHead className=" text-main2 ">Number of meetings available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subs.map((job, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <MiniTitle boldness="bold" size="lg" color="text-black" text={job.title} />
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-muted-foreground">{job.date}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.invoice}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.total}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.avilable}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
