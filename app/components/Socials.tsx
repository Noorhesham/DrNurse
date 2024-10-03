"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useDevice } from "../context/DeviceContext";

const Socials = ({ login = false }: { login?: boolean }) => {
  const t = useTranslations();
  const { generalSettings, loading } = useAuth();

  if (loading) return <Skeleton />;

  const { company_contacts, login_types } = generalSettings;
  const { email, facebook, instagram, linkedin, twitter, youtube, whatsapp } = company_contacts;
  const { social_facebook, social_linkedin, social_google } = login_types;
  const { device_info } = useDevice();
  const socialLinks = [
    { href: facebook, Icon: SlSocialFacebook },
    { href: linkedin, Icon: SlSocialLinkedin },
    { href: whatsapp, Icon: FaWhatsapp },
    { href: twitter, Icon: FaXTwitter },
    { href: instagram, Icon: FaInstagram },
    { href: youtube, Icon: FaYoutube },
  ];
  const loginBtns = login_types
    ? [
        { href: social_google, Icon: FaGoogle, slug: "google" },
        { href: social_facebook, Icon: FaFacebook, slug: "facebook" },
        { href: social_linkedin, Icon: FaLinkedin, slug: "linkedin" },
      ]
    : [];
  const renderButtonOrLink = (href: string, Icon: React.ElementType, slug: string = "") => {
    const commonStyles = "p-1.5 rounded-full text-lg bg-main";

    if (login) {
      return (
        <Link
          href={`https://lab.r-m.dev/auth/${slug}/?redirect_url=http://localhost:3001/login&device_unique_id=${device_info.device_unique_id}`}
          className={commonStyles}
        >
          <Icon />
        </Link>
      );
    }

    return (
      <Link key={href} href={href} className={commonStyles}>
        <Icon />
      </Link>
    );
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
        {arr.map(({ href, Icon, slug }, i) => renderButtonOrLink(href, Icon, slug))}
      </div>
    </div>
  );
};

export default Socials;
