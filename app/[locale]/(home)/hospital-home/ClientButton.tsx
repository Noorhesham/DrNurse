'use client';
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ClientButton = () => {
  const { userSettings } = useAuth();
  return (
    <Link href={userSettings ? "/loader" : "/signup"}>
      <Button size={"lg"} className="  mt-5 ">
        GET STARTED
      </Button>
    </Link>
  );
};

export default ClientButton;
