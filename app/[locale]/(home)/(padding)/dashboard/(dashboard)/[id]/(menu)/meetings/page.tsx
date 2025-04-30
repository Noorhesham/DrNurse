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
import { useParams, useSearchParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { FaDraft2Digital } from "react-icons/fa";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationDemo } from "@/app/components/Pagination";

const page = () => {
  const { id } = useParams();
  const searchaParams = useSearchParams();
  const page = searchaParams.get("page");

  const { data, isLoading } = useGetEntity(
    "company-jobs",
    `company-jobs-${id}-${page}`,
    "",
    {},
    `page=${page}&itemCount=10&sort=desc`
  );
  if (isLoading || !data)
    return (
      <MaxWidthWrapper className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="flex  gap-4  flex-col space-y-3">
            <Skeleton className={`w-full h-[125px]  rounded-xl`} />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    );
  const totalPages = Math.ceil(data.count / 9);

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
                    Control Available Dates
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
                <Link href={`/dashboard/${id}/meetings/control`}> Control Available Meetings</Link>
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
                      className={cn("w-full rounded-full text-xs  bg-light text-main2 ")}
                      variant={"outline"}
                    >
                      Available Dates
                    </Button>
                  }
                  content={<MeetingForm jobTitle={job.job_title} jobIdDef={job.id} invite={false} />}
                />
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  className={cn("w-full rounded-full text-xs  bg-light text-main2 ")}
                  variant={"outline"}
                >
                  <Link href={`/dashboard/${id}/meetings/control?jobId=${job.id}`}>Control Available Meetings</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 col-span-2 lg:col-span-6">
          <PaginationDemo totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default page;
