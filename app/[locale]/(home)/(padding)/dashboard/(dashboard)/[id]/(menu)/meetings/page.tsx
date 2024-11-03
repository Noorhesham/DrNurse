"use client";
import MeetingForm from "@/app/components/forms/MeetingForm";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useGetEntity } from "@/lib/queries";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { FaDraft2Digital } from "react-icons/fa";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEntity("company-jobs", `company-jobs-${id}`);
  if (isLoading || !data) return <Spinner />;
  console.log(data);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-main2 w-[40%]">MEETINGS WITHOUT POSTED JOBS</TableHead>
            <TableHead></TableHead>
            <TableHead>
              <ModalCustom
                btn={
                  <Button
                    size="sm"
                    className={cn("w-full text-xs rounded-full bg-light text-main2 ")}
                    variant={"outline"}
                  >
                    CONTROL AVIALABLE DATES
                  </Button>
                }
                content={<MeetingForm />}
              />
            </TableHead>
            <TableHead>
              <Button
                size={"sm"}
                className={cn("w-full rounded-full text-xs bg-light text-main2 ")}
                variant={"outline"}
              >
                <Link href={`/dashboard/${id}/meetings/control`}>CONTROL AVIALABLE MEETINGS</Link>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((job, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <MiniTitle text={job.job_title} />
              </TableCell>

              <TableCell className=" gap-1 text-sm">
                <div className="  flex  uppercase items-center gap-2">
                  {job.status === "publish" ? (
                    <>
                      <CheckCircle className=" text-green-500 w-4 h-4" />
                      <p className=" text-xs  text-green-500 font-semibold"> {job.status}</p>
                    </>
                  ) : job.status === "draft" ? (
                    <>
                      <FaDraft2Digital className=" text-blue-500 w-4 h-4" />
                      <p className=" text-xs  text-blue-500 font-semibold"> {job.status}</p>
                    </>
                  ) : (
                    <>
                      <XCircle className=" text-red-500 w-4 h-4" />
                      <p className="text-red-500 text-xs font-semibold"> {job.status}</p>
                    </>
                  )}
                </div>
              </TableCell>

              <TableCell className=" flex items-center gap-2 ">
                <ModalCustom
                  btn={
                    <Button
                      size={"sm"}
                      className={cn("w-full rounded-full text-xs capitalize bg-light text-main2 ")}
                      variant={"outline"}
                    >
                      AVAILABLE DATES
                    </Button>
                  }
                  content={<MeetingForm jobTitle={job.job_title} jobIdDef={job.id} invite={false} />}
                />
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  className={cn("w-full rounded-full text-xs capitalize bg-light text-main2 ")}
                  variant={"outline"}
                >
                  <Link href={`/dashboard/${id}/meetings/control?jobId=${job.id}`}>Control AVAILABLE meetings</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
