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
          <TableRow key={i}>
            <TableCell className="font-medium">
              <div className="flex flex-col items-start">
                <h1 className="text-gray-900 text-base font-semibold">{offer.title}</h1>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>{offer.duration}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="gap-1 text-sm text-green-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-4 h-4" />
                <p className="text-xs font-semibold">{offer.STATUS}</p>
              </div>
            </TableCell>
            <TableCell className="flex text-nowrap items-center gap-2">
              <Calendar />
              {offer.date}
            </TableCell>
            <TableCell className="text-right">
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
