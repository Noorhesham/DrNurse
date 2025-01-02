"use client";
import BreadCrumb from "@/app/components/BreadCrumb";

import Spinner from "@/app/components/Spinner";
import { useGetEntity } from "@/lib/queries";
import { useParams, usePathname } from "next/navigation";
import cookies from "js-cookie";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const companyId = cookies.get("hospitalId");
    if (companyId !== id || !companyId) cookies.set("hospitalId", id);
  }, []);
  const pathname = usePathname();
  const { data, isLoading } = useGetEntity("company", `company-${id}`, id);
  if (isLoading || !data) return <Spinner />;
  const lastSegment = pathname.split("/").pop();

  const formattedLastSegment = lastSegment
    ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase())
    : "";
  return (
    <section id="portal" className="pt-36  flex flex-col-reverse portalele">
      <div className="  relative">{children}</div>
      {!pathname.includes("doctor") && !pathname.includes("edit-offer") && data?.data?.title && (
        <BreadCrumb
          linksCustom={[
            { href: "", text: "Home" },
            ...(params.id ? [{ href: `/dashboard/${data?.data?.id}`, text: data?.data?.title || "" }] : []),
            ...(lastSegment !== `${params.id}` ? [{ href: pathname, text: formattedLastSegment }] : []),
          ]}
        />
      )}
    </section>
  );
}
