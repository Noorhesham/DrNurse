import QueryProvider from "@/lib/QueryProvider";
import { headers } from "next/headers";
import { DeviceProvider } from "../../context/DeviceContext";
import { Server } from "../../main/Server";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from "../../components/nav/NavBar";
import MiniTitle from "../../components/defaults/MiniTitle";
import MaxWidthWrapper from "../../components/defaults/MaxWidthWrapper";
import { convertToHTML } from "@/lib/utils";
import Footer from "../../components/Footer";
import { unstable_setRequestLocale } from "next-intl/server";
import Empty from "../../components/Empty";

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

  } catch (error) {
    console.error("Invalid URL:", error);
  }
  const data = await Server({ resourceName: "home", id: lastSlug });

  return (
    <QueryProvider>
      <DeviceProvider>
        <AuthProvider>
          <NavBar />
          <MaxWidthWrapper className=" flex justify-center items-center min-h-screen">
            {!data.status ? (
              <Empty text="404 Page Not Found" />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(data.content || "") }}
                className={`lg:max-w-4xl text-center text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
              />
            )}
          </MaxWidthWrapper>
          <Footer />
        </AuthProvider>
      </DeviceProvider>
    </QueryProvider>
  );
}
