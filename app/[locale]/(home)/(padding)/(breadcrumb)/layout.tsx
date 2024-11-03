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
    <div>
      <BreadCrumb />
      {children}
    </div>
  );
}
