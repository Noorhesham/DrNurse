import { Bai_Jamjuree } from "next/font/google";
import type { Metadata } from "next";
import { DeviceProvider } from "../context/DeviceContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "../../lib/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import Notifications from "../components/Notificationts";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import CustomIntlProvider from "../context/IntlProvider";
import "../globals.css";
import { WEBSITEURL } from "../constants";
import { LoadingProvider } from "../context/LoadingContext";
const inter = Bai_Jamjuree({ subsets: ["latin"], weight: ["400", "600", "700", "200", "300", "500"] });
const locales = ["en", "ar"];
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: {
    template: "%s | Dr Nurse",
    default: "Dr Nurse",
  },
  // canonical: WEBSITEURL,
  description:
    "Dr Nurse is a cutting-edge platform connecting healthcare professionals to exciting job opportunities. Doctors can apply for positions, hospitals can review and approve applications, and both can schedule meetings seamlessly. Empowering healthcare recruitment with ease and efficiency.",
  openGraph: {
    title: "Dr Nurse",
    description:
      "Find your next healthcare opportunity with Dr Nurse. Empowering doctors and hospitals to connect, collaborate, and grow in the medical field.",
    url: WEBSITEURL,
    images: [
      {
        url: "/logodark.webp",
        width: 1200,
        height: 630,
        alt: "Dr Nurse Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Nurse",
    description:
      "The ultimate job application platform for doctors and hospitals. Schedule meetings, review applications, and connect with top professionals in healthcare.",
    images: ["/logodark.webp"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={"en"}>
      <body className={`${inter.className}`}>
        <CustomIntlProvider messages={messages} locale={"en"}>
          <QueryProvider>
            <DeviceProvider>
              <AuthProvider>
                <Notifications />
                <ToastContainer
                  position="top-center"
                  autoClose={3500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  pauseOnHover={false}
                  theme="light"
                />

                <ReactQueryDevtools initialIsOpen={false} />

                <LoadingProvider>
                  <main className=" min-h-screen relative">{children}</main>
                </LoadingProvider>
              </AuthProvider>
            </DeviceProvider>
          </QueryProvider>
        </CustomIntlProvider>
      </body>
    </html>
  );
}
