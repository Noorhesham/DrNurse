import FormInput from "@/app/components/inputsForm/FormInput";
import Spinner from "@/app/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { VerifiedIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { InputOTPPattern } from "./OTP";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormHandler } from "@/app/hooks/useFormHandler";
import { Server } from "../../Server";
const phoneSchema = z.object({
  phoneNumber: z.object({
    country_key: z.string().min(1, "Country key is required"), // Ensure country_key is not empty
    phone: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .max(15, "Phone number must be at most 15 digits"), // Phone validation
  }),
});

const PhoneUpdate = ({ user }: { user: any }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setLogin } = useAuth();
  const [OtpError, setOtpError] = useState<string | null>(null);
  const [isVerify, setVerify] = useState(false);
  useEffect(() => {
    if (searchParams.get("vefiy") === "true") setVerify(true);
  }, [searchParams]);
  const t = useTranslations();
  const updatedParams = new URLSearchParams(searchParams.toString());
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: { phone: user?.phone || "", country_key: user?.country_key } },
  });
  const { handleFormSubmit, isPending } = useFormHandler();
  const { setError } = form;
  const verify = async () => {
    handleFormSubmit({
      apiCall: Server,
      options: { resourceName: "create-verification", body: { send_by: "sms" } },
      onSuccess: (res: any) => {
        updatedParams.set("vefiy", "true");
        updatedParams.set("uuid", res.uuid);
        router.push(`?${updatedParams.toString()}`, { scroll: false });
      },
      onError: (err: any) => {
        console.error("Failed to submit form:", err);
        setOtpError(err.message);
      },
      setError,
    });
  };
  const onSubmit = (data: z.infer<typeof phoneSchema>) => {
    const updatedData = {
      ...data,
      country_key: data.phoneNumber.country_key,
      phone: data.phoneNumber.phone || null,
    };
    handleFormSubmit({
      apiCall: Server,
      options: { resourceName: "update_profile", body: { ...updatedData } },
      onSuccess: (res: any) => {
        updatedParams.delete("vefiy");
        updatedParams.set("phone", data.phoneNumber.phone);
        updatedParams.set("uuid", res.phone_code_uuid);
        setLogin((l: any) => !l);
        router.push(`?${updatedParams.toString()}`, { scroll: false });
      },
      onError: (err: any) => {
        console.error("Failed to submit form:", err);
        setOtpError(err.message);
      },
      setError,
    });
  };
  return (
    <div className="flex justify-center items-center">
      {" "}
      <Form {...form}>
        <form className="flex flex-col px-5 py-2.5 w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex  items-center my-auto  gap-2">
            <FormInput returnFullPhone={false} phone disabled={isVerify} name="phoneNumber" label={t("Phone")} />
            {user?.phone_verified_at ? (
              <VerifiedIcon className="text-green-500" />
            ) : (
              <Button
                disabled={isPending}
                onClick={() => verify()}
                size={"sm"}
                className=" rounded-full  mt-8"
                variant="outline"
              >
                {isPending ? <Spinner /> : "Verify"}
              </Button>
            )}
          </div>

          {searchParams.get("phone") !== form.watch("phoneNumber.phone") && !isVerify && (
            <div className="flex justify-center gap-2 mt-5">
              <Button disabled={isPending} type="submit" variant="outline" size="lg" className="rounded-full">
                {isPending ? <Spinner /> : t("Update Phone")}
              </Button>
            </div>
          )}
        </form>
      </Form>{" "}
      {(searchParams.get("phone") ||
        isVerify) && (
          <div>
            <InputOTPPattern
              onSuccess={() => {
                setVerify(false);
              }}
              phone={form.getValues("phoneNumber.phone")}
              verify={searchParams.get("vefiy") === "true"}
              setServerError={setOtpError}
              sendType="sms"
              country_key={user.country_key}
            />
          </div>
        )}{" "}
      {OtpError && <p className="text-red-500 text-center mt-3 m-auto self-center text-sm">{OtpError}</p>}
    </div>
  );
};

export default PhoneUpdate;
