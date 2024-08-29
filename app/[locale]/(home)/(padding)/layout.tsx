import BreadCrumb from "@/app/components/BreadCrumb";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <section className=" pb-14 pt-40">
      <BreadCrumb />
      {children}
    </section>
  );
}
