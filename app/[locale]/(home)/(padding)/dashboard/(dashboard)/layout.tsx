"use client";
import BreadCrumb from "@/app/components/BreadCrumb";

import Spinner from "@/app/components/Spinner";
import { useGetEntity } from "@/lib/queries";
import { unstable_setRequestLocale } from "next-intl/server";
import { useParams, usePathname } from "next/navigation";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const params = useParams();
  const pathname = usePathname();
  const { data, isLoading } = useGetEntity("company", `company-${params.id}`, params.id);
  if (isLoading || !data) return <Spinner />;
  const lastSegment = pathname.split("/").pop();

  const formattedLastSegment = lastSegment
    ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase())
    : "";
  console.log(data, params.id);
  return (
    <>
      {!pathname.includes("doctor") && (
        <BreadCrumb
          linksCustom={[
            { href: "", text: "Home" },
            ...(params.id ? [{ href: `/dashboard/${data.data.id}`, text: data.data.title }] : []),
            ...(lastSegment !== `${params.id}` ? [{ href: pathname, text: formattedLastSegment }] : []),
          ]}
        />
      )}
      <div className="  relative">{children}</div>
    </>
  );
}
