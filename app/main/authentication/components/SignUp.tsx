"use client";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import { z } from "zod";
import Section from "@/app/components/defaults/Section";
import { useTranslations } from "next-intl";
import cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import Socials from "@/app/components/Socials";
const initialSignupArray = [
  {
    name: "role",
    label: "PERSON",
    label2: "HOSPITAL",
    switchToggle: true,
    noSwitch: true,
  },
  {
    name: "phone",
    placeholder: "Add Your Phone...",
    phone: true,
    returnFullPhone: false,
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
    name: "referral_code",
    optional: true,
    placeholder: "Referral Code ...",
  },
  {
    name: "register_as",
    optional: true,
    placeholder: "REGISTER AS ...",
    select: true,
    options: [
      { name: "PATIENT", value: "patient" },
      { name: "DOCTOR", value: "doctor" },
    ],
  },
];

const Signup = () => {
  const t = useTranslations();
  const singup = signupSchema(t);

  const form = useForm({
    resolver: zodResolver(singup),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      referral_code: "",
      role: false,
      phone: "",
      sms: false,
      register_as: "",
    },
    mode: "onChange",
  });
  const router = useRouter();
  const { setLogin } = useAuth();
  const [signupArray, setSignupArray] = useState(initialSignupArray);
  const [serverError, setServerError] = useState<string[] | null>(null);
  const { device_info } = useDevice();
  const [isPending, startTransition] = useTransition();
  const [methods, setMethods] = useLocalStorageState([], "methods");
  const searchParams = useSearchParams();
  useEffect(() => {
    const referal = localStorage.getItem("referal");
    if (referal) {
      form.setValue("referral_code", referal);
    }
    const role = searchParams.get("role");
    form.setValue("role", role === "doctor");
    if (!role) form.setValue("register_as", "");
    else form.setValue("register_as", "doctor");
  }, []);
  console.log(form.getValues("register_as"));
  const onSubmit = async (data: z.infer<typeof singup>) => {
    form.clearErrors();
    localStorage.removeItem("referal");
    setServerError(null);
    if (data.phone) data.country_key = data.phone.country_key;
    if (data.phone) data.phone = data.phone.phone;
    startTransition(async () => {
      const res = await Server({
        resourceName: "signup",
        body: {
          ...data,
          device_info,
        },
      });
      console.log(res);
      if (!res.status) setServerError(res.message || res.errors);
      if (res.status) {
        setServerError(null);

        if (res.activation_methods) {
          setMethods(res.activation_methods);
          toast.success(`${res.message} ...`);
          localStorage.removeItem("referal");
          redirect(`/login?uuid=${res.activation_uuid}`);
        } else {
          if (res.token) {
            cookies.set("jwt", res.token, { expires: 2 });
            setLogin((l) => !l);
            router.push("/loader");
          } else {
            toast.success(`${res.message} ...`);
            router.push("/login");
          }
        }
      }
    });
  };

  const role = form.watch("role");
  useEffect(() => {
    if (role) {
      setSignupArray((prev: any) => {
        const jobTitleExists = prev.some((input: any) => input.name === "register_as");
        if (!jobTitleExists) {
          return [
            ...prev,
            {
              name: "referral_code",
              optional: true,
              placeholder: "Referral Code ...",
            },
            {
              name: "register_as",
              select: true,
              options: ["doctor", "nurse", "specialist"],
              placeholder: "Select Your Job Title...",
              optional: true,
            },
          ];
        }
        return prev;
      });
      form.setValue("register_as", "");
    } else {
      setSignupArray((prev) => prev.filter((input) => input.name !== "register_as" && input.name !== "referral_code"));
      form.setValue("register_as", "hospital");
    }
  }, [role]);
  console.log(form.getValues("register_as"));
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
        {device_info.device_unique_id && (
        <div className=" mt-5">
            <Socials login referal={form.getValues("referral_code")} regiesterAs={form.getValues("register_as")} />
        </div>
        )}
      </div>
    </Section>
  );
};

export default Signup;
