import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";

interface Offer {
  title: string;
  date: string;
  duration: string;
  STATUS: string;
}

interface OffersTableProps {
  offers: Offer[];
}

const OffersTable: React.FC<OffersTableProps> = ({ offers }) => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow className=" bg-light">
          <TableHead className="">JOBS</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>OFFER DATE</TableHead>
          <TableHead className="">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer, i) => (
          <TableRow className=" w-full" key={i}>
            <TableCell className=" w-fit md:w-[30%] lg:w-full font-medium">
              <div className="flex flex-col items-start">
                <h1 className="text-gray-900 text-base font-semibold">{offer.title}</h1>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>{offer.duration}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className=" ml-auto text-nowrap  gap-2">
              <div className="flex items-center gap-2">
                <div className=" lg:hidden flex items-center gap-2">
                  {" "}
                  <Calendar />
                  {offer.date}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-4 h-4" />
                  <p className="text-xs font-semibold">{offer.STATUS}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className=" lg:table-cell hidden text-nowrap  gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {" "}
                  <Calendar />
                  {offer.date}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right self-end lg:mr-0 ml-auto ">
              <div className="flex items-center gap-2">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="font-semibold text-main2 hover:bg-main2 hover:text-light duration-150"
                >
                  DOWNLOAD OFFER
                </Button>
                <Button
                  size={"lg"}
                  className="font-semibold bg-light text-main2 hover:bg-main2 hover:text-light duration-150"
                >
                  TAKE ACTION
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OffersTable;
