"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";

const LoaderBtn = ({ text }: { text?: string }) => {
  const { loading, userSettings } = useAuth();
  return (
    <Link href={`${userSettings && !loading ? "/loader" : "/signup?role=hospital"}`} className="  ">
      <Button disabled={loading} size={"lg"} className="  ">
        {text || "START HIRING NOW"}
      </Button>
    </Link>
  );
};

export default LoaderBtn;
