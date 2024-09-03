import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
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
      <section className=" min-h-full pb-10 lg:pb-0">{children}</section>
      <Footer />
    </main>
  );
}
