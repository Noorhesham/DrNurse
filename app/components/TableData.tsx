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
import { format } from "date-fns";

export default function TableData({
  offer,
  jobs,
  person,
  viewbtn,
}: {
  offer?: boolean;
  jobs?: any;
  person?: boolean;
  viewbtn?: boolean;
}) {
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
        {jobs
          ?.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at))
          .map((job: any, i: Number) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium text-sm md:text-base lg:w-fit w-full">
                <div className=" flex flex-col items-start">
                  {job.status === "draft" ? (
                    <h2 className=" text-gray-900  font-semibold"> {job.job_title}</h2>
                  ) : (
                    <Link
                      href={person ? `/person/job/${job.id}` : `/dashboard/${id}/job/${job.id}`}
                      className=" text-gray-900  font-semibold"
                    >
                      {job.job_title}
                    </Link>
                  )}
                  <div className="   flex items-start gap-3 text-muted-foreground">
                    <p>{job.career_type.title}</p>
                    <span
                      className={`list-disc relative ml-3 mr-2 after:-left-2 after:top-1/2 after:-translate-y-1/2 after:absolute 
                  after:w-1.5 
                  after:h-1.5 after:rounded-full ${
                    job.status === "publish"
                      ? "after:bg-green-500"
                      : job.status === "draft"
                      ? "after:bg-blue-500"
                      : job.status === "closed"
                      ? "after:bg-red-500"
                      : " after:bg-yellow-400"
                  }`}
                    >
                      {format(job.created_at, "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={`${person && "text-green-500"}  font-semibold uppercase gap-1  my-auto  text-xs md:text-sm `}
              >
                <div className="  flex items-center   ">
                  {person && !job.min_salary && <p className=" text-gray-500">Salary Info Was Hidden By Admin</p>}
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
                  {viewbtn ? (
                    <Link target="_blank" href={`/person/job/${job.id}`}>
                      <Button
                        size={"lg"}
                        className=" font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                      >
                        VIEW JOB
                      </Button>
                    </Link>
                  ) : (
                    <Actions
                      jobId={job.id}
                      id={id}
                      person={person}
                      viewLink={person ? `/person/job/${job.id}` : `/dashboard/${id}/job/${job.id}`}
                      editLink={person ? `/person/job/${job.id}` : `/dashboard/${id}/edit-job/${job.id}`}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
