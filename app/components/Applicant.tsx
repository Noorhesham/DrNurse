"use client";
import React, { use } from "react";
import Container from "./Container";
import { CalendarIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import FunctionalButton from "./FunctionalButton";
import MeetingForm from "./forms/MeetingForm";
import UserCard from "./UserCard";
import SateChange from "./SateChange";
import { useParams } from "next/navigation";
const Applicant = ({
  applicant,
  show,
  notification,
  apply,
  jobId,
  classify = false,
}: {
  applicant: {
    image: string;
    name: string;
    duration: string;
    speciality: string;
    address: string;
    id: string;
    applicationId?: string;
    classification?: { id: string | number; name: string };
  };
  show?: boolean;
  notification?: boolean;
  apply?: boolean;
  jobId?: string;
  classify?: boolean;
}) => {
  const { id } = useParams();

  return (
    <Container className=" hover:bg-gradient-to-r from-light to-white   duration-150">
      <div
        className={` flex ${
          show ? "flex-col sm:flex-row " : ""
        } justify-between  gap-5 md:flex-nowrap flex-wrap items-start md:items-center sm:justify-between`}
      >
        <Link
          href={
            !apply ? `/dashboard/${id}/doctor/${applicant.id}${jobId ? `?job=${jobId}` : ""}` : "/dashboard/applicant/1"
          }
        >
          <UserCard show={show} applicant={applicant} />
        </Link>
        <div className=" flex items-center gap-3">
          {show ? (
            <>
              <FunctionalButton btnText="SCHEDULE MEETING" icon={<CalendarIcon />} content={<MeetingForm />} />
            </>
          ) : (
            <>
              {classify && <SateChange defaultValue={applicant.classification} jobId={applicant.applicationId} />}
              <Link
                href={!apply ? `/dashboard/${id}/doctor/${applicant.id}?job=${jobId}` : "/dashboard/applicant/1"}
                className=" p-1 m-auto rounded-xl bg-main2 text-gray-50"
              >
                <ChevronRight />
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Applicant;
