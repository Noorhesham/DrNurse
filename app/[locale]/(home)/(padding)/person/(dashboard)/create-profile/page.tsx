"use client";
import ProfileForm from "@/app/components/forms/ProfileForm";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { userSettings, loading } = useAuth();
  if (loading) return <Spinner />;
  if (userSettings?.has_profile) return redirect("/person/edit-my-profile");
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default page;
