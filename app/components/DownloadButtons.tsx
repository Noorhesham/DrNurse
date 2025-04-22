"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const DownloadButtons = () => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Skeleton />;
  const { app_store, play_store } = generalSettings.store_url||{};
  return (
    <>
      <Link href={`${app_store}`} target="_blank" className="  w-40  lg:w-full h-20 relative">
        <Image fill className=" opacity-70 object-contain" src={"/apple.png"} alt="" />
      </Link>
      <Link href={`${play_store}`} target="_blank" className=" w-40  lg:w-full h-20 relative">
        <Image fill className=" opacity-70 object-contain" src={"/google.png"} alt="" />
      </Link>
    </>
  );
};

export default DownloadButtons;
