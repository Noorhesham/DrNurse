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
}: {
  applicant: { image: string; name: string; duration: string; speciality: string; address: string; id: string };
  show?: boolean;
  notification?: boolean;
  apply?: boolean;
  jobId?: string;
}) => {
  const { id } = useParams();
  return (
    <Container className=" hover:bg-gradient-to-r from-light to-white   duration-150">
      <div
        className={` flex ${
          show ? "flex-col sm:flex-row " : ""
        } justify-between flex-col sm:flex-row  gap-5 items-start md:items-center sm:justify-between`}
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
              {!notification && <SateChange />}
              <Link
                href={!apply ? `/dashboard/${id}/doctor/${applicant.id}?job=${jobId}` : "/dashboard/applicant/1"}
                className=" p-1 rounded-xl bg-main2 text-gray-50"
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
