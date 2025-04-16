import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import FormInput from "@/app/components/inputsForm/FormInput";
import { Button } from "@/components/ui/button";
import { VerifiedIcon } from "lucide-react";
import { Server } from "../../Server";
import { useFormHandler } from "@/app/hooks/useFormHandler";
import { useAuth } from "@/app/context/AuthContext";
import Spinner from "@/app/components/Spinner";

import { InputOTPPattern } from "./OTP";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const EmailUpdate = ({ user }: { user: any }) => {
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
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: user?.email || "" },
  });
  const { handleFormSubmit, isPending } = useFormHandler();
  const { setError } = form;
  const verify = async () => {
    handleFormSubmit({
      apiCall: Server,
      options: { resourceName: "create-verification", body: { send_by: "email" } },
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
  const onSubmit = (data: z.infer<typeof emailSchema>) => {
    handleFormSubmit({
      apiCall: Server,
      options: { resourceName: "update_profile", body: data },
      onSuccess: (res: any) => {
        updatedParams.delete("vefiy");
        updatedParams.set("email", data.email);
        updatedParams.set("uuid", res.email_code_uuid);
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
            <FormInput disabled={isVerify} name="email" label={t("Email")} type="email" />
            {user?.email_verified_at ? (
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

          {searchParams.get("email") !== form.watch("email") && !isVerify && (
            <div className="flex justify-center gap-2 mt-5">
              <Button disabled={isPending} type="submit" variant="outline" size="lg" className="rounded-full">
                {isPending ? <Spinner /> : t("Update Email")}
              </Button>
            </div>
          )}
        </form>
      </Form>{" "}
      {(searchParams.get("email") || isVerify) && (
        <div>
          <InputOTPPattern
            onSuccess={() => setVerify(false)}
            email={form.getValues("email")}
            verify={searchParams.get("vefiy") === "true"}
            setServerError={setOtpError}
            sendType="email"
            country_key={user.country_key}
          />
        </div>
      )}{" "}
      {OtpError && <p className="text-red-500 text-center mt-3 m-auto self-center text-sm">{OtpError}</p>}
    </div>
  );
};

export default EmailUpdate;
