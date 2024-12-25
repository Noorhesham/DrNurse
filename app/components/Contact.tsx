"use client";
import { useGetEntity } from "@/lib/queries";
import React from "react";

const ContactPerson = ({ person }: { person: any }) => {
  const { data, isLoading } = useGetEntity("contact-doctor", `contact-${person.id}`, person.id);
  console.log(data);
  return <div></div>;
};

export default ContactPerson;
