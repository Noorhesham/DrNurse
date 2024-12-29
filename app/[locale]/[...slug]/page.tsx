import QueryProvider from "@/lib/QueryProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { Server } from "../../main/Server";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from "../../components/nav/NavBar";
import Empty from "../../components/Empty";
import MaxWidthWrapper from "../../components/defaults/MaxWidthWrapper";
import { DeviceProvider } from "../../context/DeviceContext";
import { convertToHTML } from "@/lib/utils";
import Footer from "../../components/Footer";


export default async function Page() {
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
  console.log(data)
  return (
    <QueryProvider>
      <DeviceProvider>
        <AuthProvider>
          <NavBar />
          <MaxWidthWrapper className=" !pt-32 flex justify-center items-center min-h-screen">
            {!data.status ? (
              <Empty text="404 Page Not Found" />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(data.page.content || "") }}
                className={`lg:max-w-4xl  text-black lg:text-base text-sm  font-medium my-2 leading-[1.7] `}
              />
            )}
          </MaxWidthWrapper>
          <Footer />
        </AuthProvider>
      </DeviceProvider>
    </QueryProvider>
  );
}
