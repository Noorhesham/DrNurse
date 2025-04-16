"use client";
import { Location } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import { FaMailBulk } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MotionContainer from "./defaults/MotionContainer";
import { Mail, PhoneCall } from "lucide-react";

const Address = ({ className }: { className?: String }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { generalSettings, loading } = useAuth();
  if (loading)
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  return (
    <MotionContainer className={cn(" flex-col gap-2 flex ", className)}>
      {branches.map((branch: any, i: number) => (
        <Link className=" w-fit" target="_blank" key={i} href={`${branch.co_info_location_url}`}>
          <IconWidget paragraph={branch.co_info_address[locale]} header={branch.title[locale]} icon={<Location />} />
        </Link>
      ))}
      <Link className=" w-fit" target="_blank" href={`tel:${company_contacts.phone}`}>
        <IconWidget paragraph={`${company_contacts.phone}`} header={t("address.phone")} icon={<PhoneCall />} />
      </Link>
      <Link className=" w-fit" href={`mailto:${company_contacts?.branches?.[0]?.co_info_email}`}>
        <IconWidget
          paragraph={company_contacts?.branches?.[0]?.co_info_email}
          header={t("address.email")}
          icon={<Mail />}
        />
      </Link>
    </MotionContainer>
  );
};

export default Address;
