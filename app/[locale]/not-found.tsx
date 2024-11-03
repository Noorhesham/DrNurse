import QueryProvider from "@/lib/QueryProvider";
import { headers } from "next/headers";
import { DeviceProvider } from "../context/DeviceContext";
import { Server } from "../main/Server";
import { AuthProvider } from "../context/AuthContext";
import NavBar from "../components/nav/NavBar";
import MiniTitle from "../components/defaults/MiniTitle";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import { convertToHTML } from "@/lib/utils";
import Footer from "../components/Footer";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function NotFound() {
  const headersList = headers();
  const host = headersList.get("host") || "localhost:3002";
  let fullUrl = headersList.get("referer") || "";
  unstable_setRequestLocale("en");
  // Ensure the URL is properly formed
  if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
    fullUrl = `http://${host}${fullUrl}`;
  }
  let lastSlug;
  try {
    const url = new URL(fullUrl);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    lastSlug = pathSegments[pathSegments.length - 1];

    console.log("Last Slug:", lastSlug);
  } catch (error) {
    console.error("Invalid URL:", error);
  }
  const data = await Server({ resourceName: "home", id: lastSlug });
  console.log(data);
  return (
    <section>
      <QueryProvider>
        <DeviceProvider>
          <AuthProvider>
            <NavBar />
            <section className=" min-h-screen pt-24 flex justify-center items-center">
              {data.status === false ? (
                <MiniTitle size="3xl" text="404 Not Found" />
              ) : (
                <MaxWidthWrapper>
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: convertToHTML(data.page.content || "") }}
                      className={` text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
                    />
                  }
                </MaxWidthWrapper>
              )}
            </section>
            <Footer />
          </AuthProvider>
        </DeviceProvider>
      </QueryProvider>
    </section>
  );
}
