import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { MdPeopleOutline } from "react-icons/md";
import Actions from "./Actions";

const jobs = [
  {
    title: "Anesthesiologist Doctor",
    type: "Full Time",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    applications: "798 Applications",
  },

  {
    title: "Junior Surgeon",
    type: "Full Time",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    applications: "798 Applications",
  },

  {
    title: "Senior Specialty Nurse",
    type: "Full Time",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    applications: "798 Applications",
  },

  {
    title: "bstetric and Gynecology Nurse",
    type: "Full Time",
    duration: "27 days remaing",
    STATUS: "ACTIVE",
    applications: "798 Applications",
  },
];

export default function TableData({ offer }: { offer?: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="  w-[35%]">JOBS</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>{offer ? "OFFER DATE" : "APPLICATIONS"}</TableHead>
          <TableHead className="">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium text-sm md:text-base lg:w-fit w-full">
              <div className=" flex flex-col items-start">
                <h1 className=" text-gray-900  font-semibold">{job.title}</h1>
                <div className="  flex items-center gap-3 text-muted-foreground">
                  <p>{job.type}</p>
                  <span>{job.duration}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="  gap-1  my-auto  text-xs md:text-sm text-green-500">
              <div className="  flex items-center  justify-center gap-2">
                <CheckCircle className=" text-green-500  md:w-4 w-2 h-2 md:h-4" />
                <p className=" text-xs font-semibold"> {job.STATUS}</p>
              </div>
            </TableCell>
            <TableCell className="  gap-1 mr-auto my-auto  text-xs md:text-sm ">
              <div className="  flex  md:gap-2">
                <MdPeopleOutline />
                {job.applications}
              </div>
            </TableCell>

            <TableCell className="  text-right">
              <div className="flex items-center gap-2  md:gap-5">
                <Button
                  size={"lg"}
                  className=" font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                >
                  <Link href="/dashboard/jobs/applications/1">VIEW APPLICATIONS</Link>
                </Button>
                <Actions />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
