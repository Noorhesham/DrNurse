import MeetingForm from "@/app/components/forms/MeetingForm";
import MiniTitle from "@/app/components/MiniTitle";
import ModalCustom from "@/app/components/ModalCustom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
const jobs = [
  { title: "Senior Specialty Nurse ", status: "active" },
  { title: "Senior Specialty Nurse ", status: "active" },
  { title: "Senior Specialty Nurse ", status: "closed" },
];
const page = () => {
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
                <Link href="/dashboard/meetings/control">CONTROL AVIALABLE MEETINGS</Link>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <MiniTitle text={job.title} />
              </TableCell>

              <TableCell className=" gap-1 text-sm">
                <div className="  flex  uppercase items-center gap-2">
                  {job.status === "active" ? (
                    <>
                      <CheckCircle className=" text-green-500 w-4 h-4" />
                      <p className=" text-xs  text-green-500 font-semibold"> {job.status}</p>
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
                      className={cn("w-full rounded-full text-xs bg-light text-main2 ")}
                      variant={"outline"}
                    >
                      CONTROL AVIALABLE DATES
                    </Button>
                  }
                  content={<MeetingForm />}
                />
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  className={cn("w-full rounded-full text-xs bg-light text-main2 ")}
                  variant={"outline"}
                >
                  <Link href="/dashboard/meetings/control">CONTROL AVIALABLE MEETINGS</Link>
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
