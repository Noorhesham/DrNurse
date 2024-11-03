import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/nav/NavBar";

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
    <main>
      <NavBar />
      <section className="min-h-screen relative w-full pb-10 lg:pb-0">{children}</section>
      <Footer />
    </main>
  );
}
