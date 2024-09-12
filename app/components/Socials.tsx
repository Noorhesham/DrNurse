"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Socials = ({ login = false }: { login?: boolean }) => {
  const t = useTranslations();
  const { generalSettings, loading } = useAuth();

  if (loading) return <Skeleton />;

  const { company_contacts } = generalSettings;
  const { email, facebook, instagram, linkedin, twitter, youtube, whatsapp } = company_contacts;

  const socialLinks = [
    { href: facebook, Icon: SlSocialFacebook },
    { href: linkedin, Icon: SlSocialLinkedin },
    { href: whatsapp, Icon: FaWhatsapp },
    { href: twitter, Icon: FaXTwitter },
    { href: instagram, Icon: FaInstagram },
    { href: youtube, Icon: FaYoutube },
  ];
  const loginBtns = [{ Icon: SlSocialFacebook }, { Icon: FaGoogle }, { Icon: FaXTwitter }];
  const renderButtonOrLink = (href: string, Icon: React.ElementType) => {
    const commonStyles = "p-1.5 rounded-full text-lg bg-main";

    if (login) {
      return (
        <button className={commonStyles}>
          <Icon />
        </button>
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
        {arr.map(({ href, Icon }, i) => renderButtonOrLink(href, Icon))}
      </div>
    </div>
  );
};

export default Socials;
