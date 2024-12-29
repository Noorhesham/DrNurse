"use client";
import React, { Suspense, useEffect, useLayoutEffect, useState, useTransition } from "react";

import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schema";

import Link from "next/link";
import { Server } from "../../Server";
import Logo from "@/app/components/Logo";
import { useDevice } from "@/app/context/DeviceContext";
import Socials from "@/app/components/Socials";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "@/app/hooks/useParams";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import Methods from "./Methods";
import { InputOTPPattern } from "./OTP";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import Section from "@/app/components/defaults/Section";
import CustomForm from "@/app/components/forms/CustomForm";
import Spinner from "@/app/components/Spinner";
const Login = () => {
  const t = useTranslations();
  const loginSchemaa = loginSchema(t);
  const [useEmail, setUseEmail] = useState(false);
  const [activate, setActivate] = useState(false);
  const [methods, setMethods] = useLocalStorageState([], "methods");
  const [message, setMessage] = useState("");
  const [isCode, setIsCode] = useState("");
  const [fa, set2fa] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchemaa),
    defaultValues: {
      useEmail: false,
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const [param, handleParam] = useParams("uuid", "");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { device_info } = useDevice();
  const [serverError, setServerError] = useState<string[] | string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setLogin } = useAuth();
  useLayoutEffect(() => {
    if (searchParams.get("error")) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("error");
      router.push(`?${updatedParams.toString()}`, { scroll: false });
    }
    if (param !== "") setActivate(true);
  }, [param]);
  const onSubmit = async (data: z.infer<typeof loginSchemaa>) => {
    form.clearErrors();
    setServerError(null);

    startTransition(async () => {
      try {
        const res = await Server({
          resourceName: "login",
          body: {
            ...data,
            device_info: device_info,
          },
          headers: {
            "device-unique-id": device_info.device_unique_id,
            Accept: "application/json",
          },
        });
        console.log(res);
        if (!res.status) setServerError(res.errors?.length > 0 ? res.errors : res.message);
        if (res.status) {
          setServerError(null);
          toast.success(`${res.message} ...`);
          if (res.require_activation || res.tfa) {
            if (res.tfa) set2fa(true);
            setTimeout(() => {
              setActivate(true);
            }, 300);
            if (res.require_activation) handleParam(res.activation_uuid, "uuid");
            setMethods(res.activation_methods || res.tfa_methods);
            if (res.tfa) {
              const updatedParams = new URLSearchParams(searchParams);
              updatedParams.set("tfa", "true");
              updatedParams.set("uuid", res.tfa_uuid);
              router.push(`?${updatedParams.toString()}`, { scroll: false });
            }
            setMessage(res.message);
          }
          if (!res.require_activation && !res.tfa) {
            cookies.set("jwt", res.token);
            setLogin((l) => !l);
            router.push(redirect || "/loader");
          }
        }
      } catch (error: any) {
        setServerError("Unexpected Error");
      }
    });
  };
  const handleSend = (sendType?: string) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: searchParams.get("tfa") === "true" ? "tfaSend" : "verify",
        id: param,
        body: {
          send_by: sendType,
        },
      });
      console.log(res);
      if (!res.status)
        res.message
          ? setServerError(res.message)
          : setServerError(Array.isArray(res.errors) && res.errors.length > 0 ? res.errors : res.errors.send_by);
      if (res.status) {
        setServerError(null);
        toast.success(res.message);
        setIsCode(sendType || "");
      }
    });
  };
  useEffect(() => {
    if (searchParams.get("status") === "true") {
      const token = searchParams.get("token");
      if (token) {
        toast.success(searchParams.get("message"));
        if (token) cookies.set("jwt", token || "", { expires: 2 });
        setLogin((l) => !l);
        router.push(redirect || "/loader");
      }
    }
    if (searchParams.get("status") === "false") setServerError(searchParams.get("message"));
  }, []);
  const loginArray = [
    {
      name: "username",
      placeholder: useEmail ? t("email") : t("phone"),
      phone: !useEmail,
      type: "text",
      returnFullPhone: true,
    },
    {
      name: "password",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: t("password"),
    },
  ];
  console.log(serverError);
  return (
    <Section CustomePadding="px-5 py-20" className="bg-gray-50 justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <Logo size="lg" isdark={true} />
        {!activate && (
          <>
            <h1 className="text-center text-xl md:text-2xl mt-8 font-bold text-main2">{t("login")}</h1>
            <div className="w-full mt-5 px-5 lg:px-14 gap-3 flex flex-col">
              <div className="text-main2 self-center mx-auto text-base flex items-center gap-2">
                <p className="text-main2 font-medium text-sm">{t("loginWithPhone")}</p>
                <Switch
                  noSwitch={true}
                  checked={useEmail}
                  onCheckedChange={() => {
                    setUseEmail((e) => !e);
                    form.setValue("useEmail", !useEmail);
                  }}
                />
                <p className="text-main2 font-medium text-sm">{t("loginWithEmail")}</p>
              </div>
              <CustomForm
                link="/forgot-password?level=prepare"
                linkText={t("forgotPassword")}
                btnText={t("login")}
                isPending={isPending}
                form={form}
                inputs={loginArray}
                btnStyles=" w-full"
                onSubmit={onSubmit}
              >
                <Controller
                  name="useEmail"
                  control={form.control}
                  //@ts-ignore
                  render={({ field }) => <input type="hidden" {...field} value={useEmail} />}
                />
              </CustomForm>

              <Socials login={true} />
            </div>
            <div className="mt-8 text-sm flex flex-col gap-2 md:gap-0 md:flex-row items-center">
              <span className="font-[400] text-main2">{t("dontHaveAccount")}</span>
              <Link href="/signup" className="hover:underline duration-150 ml-1 text-main font-[700]">
                {" "}
                {t("createAccount")}{" "}
              </Link>
            </div>

            <Link href="/" className="hover:underline duration-150 mt-2 text-main  font-semibold">
              {" "}
              {t("backtowebsite")}{" "}
            </Link>
          </>
        )}{" "}
        <Suspense fallback={<Spinner />}>
          {activate && !isCode && (
            <Methods
              tfa={(fa && "true") || searchParams.get("tfa") || ""}
              handleSend={handleSend}
              message={message}
              methods={methods}
            />
          )}
          {isCode !== "" && activate && (
            <>
              {" "}
              <InputOTPPattern
                isPending2={isPending}
                forgot={false}
                tfa={fa || Boolean(searchParams.get("tfa") === "true")}
                setServerError={setServerError}
                sendType={isCode}
                handleSend={handleSend}
              />{" "}
              <Link href="/" className="hover:underline duration-150 mt-4 text-main  font-semibold">
                {" "}
                {t("backtowebsite")}{" "}
              </Link>
            </>
          )}{" "}
          {serverError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>}
        </Suspense>
      </div>
    </Section>
  );
};

export default Login;
// referral_code=asdfs56&register_as=doctor&job_title=newdoc
