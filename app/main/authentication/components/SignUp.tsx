"use client";
import Section from "@/app/components/Section";
import { useState, useTransition, useEffect } from "react";
import CustomForm from "@/app/components/forms/CustomForm";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schema";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import Logo from "@/app/components/Logo";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import { z } from "zod";

const initialSignupArray = [
  {
    name: "role",
    label: "PERSON",
    label2: "HOSPITAL",
    switchToggle: true,
  },
  {
    name: "phone",
    placeholder: "Add Your Phone...",
    phone: true,
  },
  {
    name: "sms",
    label: "ACTIVE BY SMS",
    label2: "ACTIVE BY WHATSAPP",
    switchToggle: true,
  },
  {
    name: "password",
    type: "password",
    password: true,
    placeholder: "Add Your Password...",
  },
  {
    name: "name",
    placeholder: "Add Your Name...",
  },
  {
    name: "email",
    placeholder: "Add Your Email...",
    optional: true,
  },
  {
    name: "referealCode",
    optional: true,
    placeholder: "REFERRAL CODE ...",
  },
];

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      referealCode: "",
      role: "person", // Default to person for testing
      phone: "",
      sms: false,
      jobTitle: "", // Add jobTitle to default values
    },
    mode: "onChange",
  });

  const [signupArray, setSignupArray] = useState(initialSignupArray);
  const [serverError, setServerError] = useState<string[] | null>(null);
  const { deviceInfo } = useDevice();
  const [isPending, startTransition] = useTransition();
  const [methods, setMethods] = useLocalStorageState([], "methods");

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "signup",
        body: {
          ...data,
          device_info: deviceInfo,
        },
      });
      if (!res.status) setServerError(res.errors);
      if (res.status) {
        setServerError(null);
        const res = await Server({
          resourceName: "login",
          body: {
            username: data.phone || data.email,
            password: data.password,
            device_info: deviceInfo,
          },
          headers: {
            "device-unique-id": deviceInfo.device_unique_id,
            Accept: "application/json",
          },
        });
        if (res.activation_methods) {
          setMethods(res.activation_methods);
          toast.success(`${res.message} ...`);
          redirect(`/login?uuid=${res.activation_uuid}`);
        }
      }
    });
  };

  const role = form.watch("role");
  useEffect(() => {
    if (role) {
      setSignupArray((prev) => {
        const jobTitleExists = prev.some((input) => input.name === "jobTitle");
        if (!jobTitleExists) {
          return [
            ...prev,
            {
              name: "jobTitle",
              select: true,
              options: ["Doctor", "Nurse", "Technician"],
              placeholder: "Select Your Job Title...",
            },
          ];
        }
        return prev;
      });
    } else {
      setSignupArray((prev) => prev.filter((input) => input.name !== "jobTitle"));
    }
  }, [role]);

  return (
    <Section CustomePadding="px-5  py-10" className=" flex flex-1 justify-center flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <Logo isdark size="lg" />
        <h1 className="text-center text-2xl mt-5 font-bold text-main2">CREATE NEW ACCOUNT</h1>
        <div className="w-full px-5 md:px-14 flex flex-col">
          <CustomForm
            btnStyles="w-full"
            isPending={isPending}
            serverError={serverError}
            btnText="CREATE"
            form={form}
            inputs={signupArray}
            onSubmit={onSubmit}
          />
          <div className="my-4 text-sm flex items-center">
            <span className="font-[400] text-main2">ALREADY ON DRNURSE ?</span>
            <Link href={"/login"} className="hover:underline duration-150 ml-1 text-main font-[700]">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Signup;
