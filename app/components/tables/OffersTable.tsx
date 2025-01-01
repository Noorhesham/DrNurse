import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Contact, TimerIcon, XCircle } from "lucide-react";
import ModalCustom from "../defaults/ModalCustom";
import MeetingActions from "../forms/MeetingActions";
import Negotiation from "../Negotiation";
import Paragraph from "../defaults/Paragraph";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import DownloadOffer from "../DownloadOffer";
import { addDays, differenceInDays, format } from "date-fns";
import ContactPerson from "../Contact";
import useCachedQuery from "@/app/hooks/useCachedData";
import Spinner from "../Spinner";
import Link from "next/link";
import { useParams,  } from "next/navigation";

interface OffersTableProps {
  offers: any[];
  action?: boolean;
  person?: boolean;
}

const OffersTable: React.FC<OffersTableProps> = ({ offers, action, person = false }) => {
  console.log(offers);
  const { data: general, loading: isGeneralLoading } = useCachedQuery("general_settings");
  const {id}=useParams()
  if (isGeneralLoading) return <Spinner />;
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
        {offers.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at)) .map((offer, i) => {
          const createdAt = new Date(offer.created_at);
          const cancellationDeadline = addDays(createdAt, Number(general?.offer_cancelled_after) || 7);
          const today = new Date();
          const daysLeft = differenceInDays(cancellationDeadline, today);
          console.log(daysLeft, today, cancellationDeadline, general);
          return (
            <TableRow className="" key={i}>
              <TableCell className=" w-fit text-nowrap md:w-[30%] font-medium">
                <div className="flex flex-col items-start">
                  <h2 className="text-gray-900 text-sm font-semibold">
                    {offer.details.job_title.length > 40
                      ? `${offer.details.job_title.slice(0, 40)}...`
                      : offer.details.job_title}
                    <br />
                    {offer.user?.name && (
                      <Link href={`/dashboard/${id}/doctor/${offer.user?.profile?.id}`}>
                        To {offer.user?.name.length > 40 ? `${offer.user?.name.slice(0, 40)}...` : offer.user?.name}
                      </Link>
                    )}
                    <br /> {offer.company && `From `}
                    {offer.company?.title.length > 70
                      ? `${offer.company?.title.slice(0, 50)}...`
                      : offer.company?.title || ""}
                  </h2>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{offer.duration}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className=" ml-auto text-nowrap  gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-sm items-center gap-2">
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
                      {offer.negotiation &&
                      !person &&
                      offer.status.toLowerCase() !== "approved" &&
                      offer.status.toLowerCase() !== "rejected"
                        ? "NEGOTIATION"
                        : offer.status}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className=" w-full lg:table-cell    gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex  max-w-md capitalize items-center gap-2">
                    {offer.status.toLowerCase() === "rejected" ? (
                      <span className=" text-red-500">Offer Already Rejected</span>
                    ) : daysLeft > 0 ? (
                      <span className="flex items-center gap-2">
                        <Calendar className=" lg:block hidden w-6 h-6" />
                        Must be approved in {daysLeft} day{daysLeft > 1 ? "s" : ""} In Advance.
                      </span>
                    ) : (
                      <span>Offer period has expired.</span>
                    )}
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
                  {offer.negotiation &&
                    offer.status.toLowerCase() !== "approved" &&
                    offer.status.toLowerCase() !== "rejected" &&
                    daysLeft > 0 && (
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
                  {offer.status.toLowerCase() === "approved" && offer.user?.id && (
                    <ModalCustom
                      btn={
                        <Button className=" rounded-full text-sm" size={"sm"}>
                          Call{" "}
                          {offer.user?.name.split(" ")[0].length > 20
                            ? `${offer.user?.name.split(" ")[0].slice(0, 20)}...`
                            : offer.user?.name.split(" ")[0]}
                        </Button>
                      }
                      content={<ContactPerson person={offer.user?.id} />}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OffersTable;
