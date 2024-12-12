import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, TimerIcon, XCircle } from "lucide-react";
import ModalCustom from "../defaults/ModalCustom";
import MeetingActions from "../forms/MeetingActions";
import Negotiation from "../Negotiation";
import Paragraph from "../defaults/Paragraph";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import DownloadOffer from "../DownloadOffer";

interface OffersTableProps {
  offers: any[];
  action?: boolean;
  person?: boolean;
}

const OffersTable: React.FC<OffersTableProps> = ({ offers, action, person = false }) => {
  console.log(offers);
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
                <h2 className="text-gray-900 text-base font-semibold">
                  {offer.details.job_title.length > 70
                    ? `${offer.details.job_title.slice(0, 70)}...}`
                    : offer.details.job_title}
                </h2>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>{offer.duration}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className=" ml-auto text-nowrap  gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {offer.status.toLowerCase() === "accepted" || offer.status.toLowerCase() === "approved" ? (
                    <CheckCircle className="text-green-500" />
                  ) : offer.status.toLowerCase() === "rejected" ? (
                    <XCircle className="text-red-500" />
                  ) : offer.negotiation && !person ? (
                    <ExclamationTriangleIcon className=" text-yellow-500" />
                  ) : offer.status.toLowerCase() === "pending" ? (
                    <TimerIcon className=" text-blue-500" />
                  ) : null}
                  <p className="text-sm uppercase font-semibold">
                    {offer.negotiation && !person && offer.status.toLowerCase() !== "approved"
                      ? "NEGOTIATION"
                      : offer.status}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className=" w-full lg:table-cell    gap-2">
              <div className="flex items-center gap-2">
                <div className="flex  max-w-md capitalize items-center gap-2">
                  <Calendar className=" lg:block hidden w-6 h-6" />
                  {offer.details.start_date} Must be approved 7 days in advance
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right self-end lg:mr-0 ml-auto ">
              <div className="flex items-center gap-2">
                <DownloadOffer name={offer.details.job_title} id={offer.id} />
                {action && offer.status !== "rejected" && offer.status !== "approved" && (
                  <ModalCustom
                    btn={
                      <Button className="lg:w-[50%] w-full rounded-full" size={"sm"}>
                        TAKE ACTION
                      </Button>
                    }
                    content={<MeetingActions offerId={offer.id} />}
                  />
                )}
                {offer.negotiation && offer.status.toLowerCase() !== "approved" && (
                  <ModalCustom
                    btn={
                      <Button className=" rounded-full" size={"sm"}>
                        INFO
                      </Button>
                    }
                    content={
                      person ? (
                        <div className=" flex flex-col justify-center items-center gap-4">
                          <h3 className=" text-xl lg:text-2xl uppercase text-main2 font-semibold mt-4">
                            Negotiation DETAILS
                          </h3>
                          <Paragraph
                            className=" text-center m-auto"
                            size="lg"
                            description={offer.negotiation.description}
                          />
                        </div>
                      ) : (
                        <Negotiation jobOfferId={offer.id} negotiation={offer.negotiation} />
                      )
                    }
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
