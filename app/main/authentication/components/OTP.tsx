"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import cookies from "js-cookie";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/AuthContext";
import { Suspense, useEffect, useState, useTransition } from "react";
import Spinner from "@/app/components/Spinner";
import { useDevice } from "@/app/context/DeviceContext";

import { useTranslations } from "next-intl";
import FormInput from "@/app/components/inputsForm/FormInput";
import useCachedQuery from "@/app/hooks/useCachedData";
const TIMER_DURATION = 10;
export function InputOTPPattern({
  handleSend,
  sendType,
  setServerError,
  forgot = false,
  tfa,
  email,
  activate,
  revalidate,
  phone,
  country_key,
  isPending2,
  verify,
  onSuccess,
}: {
  handleSend?: any;
  sendType: string;
  setServerError?: any;
  forgot?: boolean;
  tfa?: boolean;
  email?: string;
  activate?: boolean;
  revalidate?: any;
  phone?: string;
  country_key?: string;
  verify?: boolean;
  isPending2?: boolean;
  onSuccess?: any;
}) {
  const { setLogin } = useAuth();
  const { data, invalidateData, loading } = useCachedQuery("user_settings");

  const [resending, setResending] = useState(false);
  // const [timer, setTimer] = useState<number>(TIMER_DURATION);
  // const [activeTimer, setActiveTimer] = useState(true);
  // useEffect(() => {
  //   if (!activeTimer) return;
  //   if (timer === 0) {
  //     setActiveTimer(false);
  //   }
  //   const timeout = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);
  //   return () => clearInterval(timeout);
  // }, [timer]);
  const otpSchema = z.object({
    code: z.string().min(6).max(6),
    password: !forgot
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number")
          .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });
  const form = useForm<z.infer<typeof otpSchema>>({ resolver: zodResolver(otpSchema) });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { device_info } = useDevice();
  const t = useTranslations();
  const Resend = async () => {
    try {
      setResending(true);
      const res = await Server({
        resourceName: forgot
          ? "reset"
          : tfa
          ? "tfaValidate"
          : verify
          ? "create-verification"
          : email || phone
          ? "update_profile"
          : activate
          ? "tfaActivate"
          : "validate",
        id: searchParams.get("uuid") || "",
        body: {
          send_type: sendType,
          send_by: sendType || "sms",
          email: email && searchParams.get("email"),
          phone: phone && searchParams.get("phone"),
          type: "verify",
          email_uuid: email && searchParams.get("uuid"),
          device_info: device_info,
          phone_uuid: phone && searchParams.get("uuid"),
          country_key: phone && country_key,
        },
      });
      if (!res.status) setServerError(res.message);
      if (res.status) toast.success(res.message);
    } catch (error) {
      setServerError(error);
    } finally {
      setResending(false);
    }
  };
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: forgot
          ? "reset"
          : tfa
          ? "tfaValidate"
          : verify
          ? "verify-account"
          : email || phone
          ? "update_profile"
          : activate
          ? "tfaActivate"
          : "validate",
        id: searchParams.get("uuid") || "",
        body: {
          send_type: sendType,
          send_by: sendType || "sms",
          code: data?.code,
          uuid: searchParams.get("uuid"),
          username: searchParams.get("username"),
          type: activate ? "verify" : searchParams.get("level"),
          password: forgot && data.password,
          email_code: email && data?.code,
          tfa: activate && "1",
          email_uuid: email && searchParams.get("uuid"),
          email: email && searchParams.get("email"),
          device_info: device_info,
          phone: phone && searchParams.get("phone"),
          phone_uuid: phone && searchParams.get("uuid"),
          phone_code: phone && data?.code,
          country_key: phone && country_key,
        },
      });
      console.log(res);
      const redirect = searchParams.get("redirect");

      if (!res.status) setServerError(res.message);
      if (res.status) {
        onSuccess?.();
        invalidateData();
        if (res.token) cookies.set("jwt", res.token, { expires: 2 });
        toast.success(res.message);
        if (!forgot) setLogin((l: boolean) => !l);
        setServerError(null);
        const updatedParams = new URLSearchParams(searchParams.toString());
        ["username", "uuid", "level", "email", "phone", "verify"].forEach((p) => updatedParams.delete(p));
        if (activate) return;
        if (email || phone) {
          return router.push(`?${updatedParams.toString()}`, { scroll: false });
        }
        if (res.token) router.push("/loader");
        else if (forgot) router.push("/login");
        else router.push(redirect ? redirect : "/");
      }
    });
  };
  return (
    <Suspense>
      <div className="flex flex-col gap-4 items-center mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("validation")}</FormLabel>
                  <FormControl>
                    <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        {<InputOTPSlot index={5} />}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t("validation_code")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {forgot && <FormInput name="password" type="password" control={form.control} placeholder={t("password")} password />}
            <div className="mt-4  flex items-center gap-2">
              {!activate && (
                <Button
                  disabled={resending || isPending}
                  type="button"
                  className="rounded-full relative min-w-[150px] bg-white border-main border  text-main hover:text-white flex-1 px-8"
                  onClick={(e) => {
                    startTransition(async () => {
                      e.stopPropagation();
                      // setTimer(TIMER_DURATION);
                      // setActiveTimer(true);
                      handleSend ? handleSend(sendType) : Resend();
                    });
                  }}
                >
                  {/* timer ? (
                    `${timer} s`
                  ) : */}
                  {resending || isPending ? (
                    <Spinner className=" border-[5px] border-[#3a4f91] m-auto" />
                  ) : (
                    t("resend_code")
                  )}
                </Button>
              )}
              <Button disabled={isPending} className="  relative flex-1 rounded-full px-8" type="submit">
                {isPending ? <Spinner className=" border-[5px] border-[#3a4f91] m-auto" /> : t("Submit")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
