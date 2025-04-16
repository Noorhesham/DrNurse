"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useDevice } from "../context/DeviceContext";
import { APIURL, WEBSITEURL } from "../constants";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useCachedQuery from "../hooks/useCachedData";

const Socials = ({
  login = false,
  referal,
  regiesterAs,
}: {
  login?: boolean;
  referal?: string;
  regiesterAs?: string;
}) => {
  const t = useTranslations();
  const { data: generalSettings, loading } = useCachedQuery("general_settings");
  console.log(generalSettings);
  const { device_info } = useDevice();

  if (loading || !device_info.device_unique_id) return <Skeleton />;
  const { company_contacts, login_types } = generalSettings || {};
  const { email, facebook, instagram, linkedin, twitter, youtube, whatsapp, tiktok } = company_contacts || {};
  const { social_facebook, social_linkedin, social_google } = login_types || {};
  const socialLinks = [
    { href: facebook, Icon: SlSocialFacebook },
    { href: linkedin, Icon: SlSocialLinkedin },
    { href: whatsapp, Icon: FaWhatsapp },
    { href: twitter, Icon: FaXTwitter },
    { href: instagram, Icon: FaInstagram },
    { href: youtube, Icon: FaYoutube },
    { href: tiktok, Icon: FaTiktok },
  ];
  const loginBtns = login_types
    ? [
        { href: "", Icon: FaGoogle, slug: "google" },
        { href: "", Icon: FaFacebook, slug: "facebook" },
        { href: "", Icon: FaLinkedin, slug: "linkedin-openid" },
      ]
    : [];
  const router = useRouter();
  const renderButtonOrLink = (href: string, Icon: React.ElementType, slug: string = "", key: number) => {
    const commonStyles = "p-1.5  text-center m-auto flex items-center !min-w-[35px] rounded-full text-lg bg-main";
    const loginUrl = `${APIURL}/auth/socialite/${slug}/login?redirect_url=${WEBSITEURL}/login&device_unique_id=${
      device_info.device_unique_id
    }${regiesterAs ? `&register_as=${regiesterAs}` : ``}${referal ? `&referral_code=${referal}` : ``}`;

    // &referral_code=asdfs56&register_as=doctor&job_title=newdoc
    if (login) {
      return (
        <div>
          <Button
            onClick={() => {
              device_info.device_unique_id && router.push(loginUrl);
            }}
            size={"sm"}
            className={commonStyles}
          >
            <Icon />
          </Button>
        </div>
      );
    }

    if (href !== "") {
      return (
        <Link
          target="_blank"
          key={key}
          href={href || ""}
          className={"flex items-center p-1.5 rounded-full text-lg bg-main"}
        >
          <Icon />
        </Link>
      );
    }
  };
  const arr = login ? loginBtns : socialLinks;
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
      </div>
      <div className="flex text-gray-50 self-center items-center gap-2">
        {arr.map(({ href, Icon, slug }, i) => renderButtonOrLink(href, Icon, slug, i))}
      </div>
    </div>
  );
};

export default Socials;
