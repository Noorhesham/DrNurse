"use client";
import ProfileForm from "@/app/components/forms/ProfileForm";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { useGetEntity } from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { data, isLoading } = useGetEntity("my-profile", "my-profile");
  const { userSettings, loading } = useAuth();
  const router = useRouter();
  if (isLoading || !data || loading) return <Spinner />;
  // if (!userSettings?.has_profile) return router.push("/person/create-profile");

  return (
    <div>
      <ProfileForm data={data.data} />
    </div>
  );
};

export default page;
