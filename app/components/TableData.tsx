"use client";
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
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { MdPeopleOutline } from "react-icons/md";
import Actions from "./Actions";
import { useParams } from "next/navigation";
import { Job } from "../types";
import { FaDraft2Digital } from "react-icons/fa";

export default function TableData({ offer, jobs, person }: { offer?: boolean; jobs?: any; person?: boolean }) {
  const { id } = useParams();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="  w-[35%]">JOBS</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>{offer ? "OFFER DATE" : person ? "ADDRESS" : "APPLICATIONS"}</TableHead>
          <TableHead className="">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs?.map((job: any, i: Number) => (
          <TableRow key={i}>
            <TableCell className="font-medium text-sm md:text-base lg:w-fit w-full">
              <div className=" flex flex-col items-start">
                <Link
                  href={person ? `/person/job/${job.id}` : `/dashboard/${id}/job/${job.id}`}
                  className=" text-gray-900  font-semibold"
                >
                  {job.job_title}
                </Link>
                <div className="  flex items-center gap-3 text-muted-foreground">
                  <p>{job.type}</p>
                  <span>{job.duration}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className={`${person && "text-green-500"}  uppercase gap-1  my-auto  text-xs md:text-sm `}>
              <div className="  flex items-center  justify-center ">
                {person && !job.min_salary ? (
                  <p className=" text-gray-500">Salary Info Was Hidden By Admin</p>
                ) : !person && job.status === "publish" ? (
                  <CheckCircle className=" mr-2 text-green-500  md:w-4 w-2 h-2 md:h-4" />
                ) : job.status === "draft" ? (
                  <FaDraft2Digital className=" mr-2  text-blue-500  md:w-4 w-2 h-2 md:h-4" />
                ) : job.status === "closed" ? (
                  <XCircle className=" mr-2 text-red-500  md:w-4 w-2 h-2 md:h-4" />
                ) : (
                  ""
                )}
                <p className=" text-xs font-semibold">
                  {person && job.min_salary && job.max_salary
                    ? `${job.min_salary} ${job.currency || "SAR"} -${job.max_salary} ${job.currency || "SAR"} /MONTH`
                    : !person && job.status}
                </p>
              </div>
            </TableCell>
            <TableCell className="  gap-1 mr-auto my-auto  text-xs md:text-sm ">
              {person ? (
                <p>
                  {job.branch?.country?.title ? `${job.branch?.country?.title},` : "Not Provided"}{" "}
                  {job.branch?.state?.title || ""}
                </p>
              ) : (
                <div className="  flex  items-center  md:gap-2">
                  <MdPeopleOutline />
                  {job.applicants_count}
                </div>
              )}
            </TableCell>

            <TableCell className="  text-right">
              <div className="flex items-center gap-2  md:gap-5">
                {!person && (
                  <Button
                    size={"lg"}
                    className=" font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                  >
                    <Link href={`/dashboard/${id}/jobs/applications/${job.id}`}>VIEW APPLICATIONS</Link>
                  </Button>
                )}
                <Actions
                  jobId={job.id}
                  id={id}
                  person={person}
                  viewLink={person ? `/person/job/${job.id}` : `/dashboard/${id}/job/${job.id}`}
                  editLink={person ? `/person/job/${job.id}` : `/dashboard/${id}/edit-job/${job.id}`}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
