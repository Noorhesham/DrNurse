import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/app/components/Heading";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { BsExclamationCircle, BsExclamationCircleFill } from "react-icons/bs";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import FunctionalButton from "@/app/components/FunctionalButton";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import Logo from "@/app/components/Logo";
import MiniTitle from "@/app/components/defaults/MiniTitle";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const { status, message, response, error, explanation } = searchParams;

  const hospitalId = cookies().get("hospitalId")?.value;
  return (
    <MaxWidthWrapper>
      <Dialog open={true}>
        <DialogContent className="  max-w-4xl text-center py-10 overflow-y-auto max-h-[80vh] flex flex-col items-center  sm:rounded-[1.8rem]">
          {status === "success" || !status ? (
            <>
              <Logo isdark={true} />
              <h1 className=" hidden">{t("success")}</h1>
              <MiniTitle text={t("Order Completed")} />
              <Paragraph
                size="sm"
                description={
                  message || "Your order has been successfully completed. You can find it in your dashboard."
                }
              />
              <div className=" flex items-center gap-2">
                <FunctionalButton noicon link={`/dashboard/${hospitalId}/invoices`} btnText={t("MY INVOICES")} />
                <FunctionalButton noicon link={`/dashboard/${hospitalId}`} btnText={t("BACK TO HOME")} />
              </div>
            </>
          ) : (
            <div className=" flex  bg-background flex-col items-center justify-center ">
              <BsExclamationCircleFill className=" text-red-400 w-32 h-32 relative" />
              <Paragraph className=" uppercase font-semibold text-3xl" size="lg" description={message} />
              <div className=" flex items-center gap-2">
                <Link
                  className=" flex items-center gap-2 hover:underline duration-150 hover:text-main"
                  href={`/dashboard/${hospitalId}`}
                >
                  {t("Return to Hospital")}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MaxWidthWrapper>
  );
};

export default page;
