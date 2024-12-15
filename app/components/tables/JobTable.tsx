import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Job {
  name: string;
  hospital: string;
  salary: string;
  address: string;
}

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className=" bg-light">
          <TableHead className="lg:w-[40%]">JOBS</TableHead>
          <TableHead>SALARY</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <div className="flex flex-col items-start">
                <h2 className="text-gray-900  text-base font-semibold">{job.name}</h2>
                <p className="text-muted-foreground">{job.hospital}</p>
              </div>
            </TableCell>
            <TableCell className="gap-1 my-auto  text-sm text-green-500">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold">{job.salary}</p>
              </div>
            </TableCell>
            <TableCell className="flex items-center  my-auto  gap-2">
              <p>{job.address}</p>
            </TableCell>
            <TableCell className="text-right lg:ml-0 ml-auto">
              <div className="flex items-center gap-2">
                <Button
                  size={"lg"}
                  className="font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                >
                  <Link href="/dashboard/job/1">VIEW JOB</Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobsTable;
