"use client";
import { useGetEntity } from "@/lib/queries";
import React from "react";
import Spinner from "./Spinner";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Link from "next/link";
import MiniTitle from "./defaults/MiniTitle";
import IconWidget from "./IconWidget";
import { FaMailBulk } from "react-icons/fa";
import { Phone } from "@/app/components/Icons";

const ContactPerson = ({ person }: { person: any }) => {
  const { data, isLoading } = useGetEntity("contact-doctor", `contact-${person}`, person);
  if (isLoading) return <Spinner />;
  console.log(data, person);
  return (
    <MaxWidthWrapper className=" flex flex-col gap-5">
      <MiniTitle text={`Contact Info For ${data.data.name}`} />

      <Link target="_blank" href={`tel:+${data.data.country_key}${data.data.phone}`}>
        <IconWidget
          paragraph={`+${data.data?.country_key || ""} ${data.data.phone}`}
          header={"Phone"}
          icon={<Phone />}
        />
      </Link>
      <Link href={`mailto:${data.data.email}`}>
        <IconWidget paragraph={data.data.email} header={"Email"} icon={<FaMailBulk className=" text-main" />} />
      </Link>
      {data.data?.resume.length > 0 && (
        <Link target="_blank" className=" text-main2 underline" href={data.data?.resume?.[0]?.file}>
          View Resume
        </Link>
      )}
    </MaxWidthWrapper>
  );
};

export default ContactPerson;
