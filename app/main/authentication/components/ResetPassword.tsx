"use client";
import Logo from "@/app/components/Logo";

import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useParams } from "@/app/hooks/useParams";
import Prepare from "./Prepare";
import Link from "next/link";
import { Server } from "../../Server";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Methods from "./Methods";
import { InputOTPPattern } from "./OTP";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import Spinner from "@/app/components/Spinner";
import { useLocale, useTranslations } from "next-intl";
import Section from "@/app/components/defaults/Section";

const ResetPassword = () => {
  const t = useTranslations(); // For translations
  const [param, handleParam, deleteParam] = useParams("level", "prepare");
  const searchParams = useSearchParams();
  const [methods, setMethods] = useLocalStorageState("methods", ""); //local or not
  const [message, setMessage] = useState<string | null>(null);
  const [server, setServerError] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("");
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    if (!methods) {
      deleteParam("uuid");
      deleteParam("username");
      handleParam("prepare");
    }
  }, [methods]);

  const handleSend = async (sendType?: string) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "reset",
        body: {
          type: "forgot",
          uuid: searchParams.get("uuid"),
          username: searchParams.get("username"),
          send_type: sendType,
        },
      });
      handleParam("code");
      setType(sendType || "");
      console.log(res);
      if (!res.status) setServerError(res.message);
      if (res.status) {
        toast.success(res.message);
      }
    });
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Section CustomePadding="px-5 py-40" className=" bg-gray-50 justify-center flex flex-1 flex-col items-center">
        <div className=" mx-auto flex flex-col items-center justify-center w-full">
          <Logo isdark size="lg" />
          <h3 className=" text-center text-2xl mt-8 font-bold text-main2">{t("forgotPasswordContent.title")}</h3>
          {param === "prepare" && <Prepare setMessage={setMessage} handleParam={handleParam} setMethods={setMethods} />}
          {param === "forgot" && (
            <Methods reset={true} message={message || ""} handleSend={handleSend} methods={methods} />
          )}
          {param === "code" && (
            <InputOTPPattern
              forgot={true}
              sendType={type || ""}
              handleSend={handleSend}
              setServerError={setServerError}
            />
          )}
          {server && <p className="text-red-500 mx-auto text-center mt-5 text-sm font-semibold">{server}</p>}
          <div className="mt-8 text-sm flex items-center">
            <Link
              href={"/login"}
              className={`${
                locale === "ar" && "flex-row-reverse "
              }flex items-center gap-2 hover:underline duration-150 ml-1 text-main font-[700]`}
            >
              {t("forgotPasswordContent.backToLogin")}
            </Link>
          </div>
        </div>
      </Section>
    </Suspense>
  );
};

export default ResetPassword;
