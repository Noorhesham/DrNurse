import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, TimerIcon, XCircle } from "lucide-react";
import ModalCustom from "../defaults/ModalCustom";
import MeetingActions from "../forms/MeetingActions";
import Negotiation from "../Negotiation";

interface OffersTableProps {
  offers: any[];
  action?: boolean;
}

const OffersTable: React.FC<OffersTableProps> = ({ offers, action }) => {
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
          <TableRow className="" key={i}>
            <TableCell className=" w-fit text-nowrap md:w-[30%] font-medium">
              <div className="flex flex-col items-start">
                <h1 className="text-gray-900 text-base font-semibold">{offer.details.job_title}</h1>
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
                  {offer.status.toLowerCase() === "accepted" || offer.status.toLowerCase() === "approved" ? (
                    <CheckCircle className="text-green-500" />
                  ) : offer.status === "rejected" || offer.negotiation ? (
                    <XCircle className="text-red-500" />
                  ) : offer.status === "pending" ? (
                    <TimerIcon className=" text-blue-500" />
                  ) : null}
                  <p className="text-sm uppercase font-semibold">{offer.negotiation ? "NEGOTIATION" : offer.status}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className=" w-full lg:table-cell hidden   gap-2">
              <div className="flex items-center gap-2">
                <div className="flex  max-w-md capitalize items-center gap-2">
                  <Calendar />
                  {offer.details.start_date} Must be approved 7 days in advance
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right self-end lg:mr-0 ml-auto ">
              <div className="flex items-center gap-2">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="font-semibold text-main2 bg-light hover:bg-main2 hover:text-light duration-150"
                >
                  DOWNLOAD OFFER
                </Button>
                {action && offer.status !== "rejected" && offer.status !== "approved" && (
                  <ModalCustom
                    btn={
                      <Button className=" rounded-full" size={"sm"}>
                        TAKE ACTION
                      </Button>
                    }
                    content={<MeetingActions offerId={offer.id} />}
                  />
                )}
                {offer.negotiation && !action && (
                  <ModalCustom
                    btn={
                      <Button className=" rounded-full" size={"sm"}>
                        NEGOTIATION DETAILS
                      </Button>
                    }
                    content={<Negotiation jobOfferId={offer.id} negotiation={offer.negotiation} />}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OffersTable;
