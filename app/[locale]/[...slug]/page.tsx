import QueryProvider from "@/lib/QueryProvider";
import { Server } from "../../main/Server";
import { AuthProvider } from "../../context/AuthContext";
import Empty from "../../components/Empty";
import { DeviceProvider } from "../../context/DeviceContext";
import { convertToHTML } from "@/lib/utils";
import Footer from "../../components/Footer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import NavBar from "@/app/components/nav/NavBar";

// Add this validation function
const isValidSlug = (slug: string) => {
  const invalidExtensions = [".css", ".js", ".map", ".json", ".png", ".jpg"];
  return !invalidExtensions.some((ext) => slug.includes(ext));
};

// Add generateStaticParams to control valid paths
export async function generateStaticParams() {
  return []; // Return your actual valid slugs here if known
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const lastSlug = params.slug[params.slug.length - 1];

  // Validate slug before making the request
  if (!isValidSlug(lastSlug)) {
    return <Empty text="404 Page Not Found" />;
  }

  try {
    const data = await Server({
      resourceName: "home",
      id: lastSlug,
      cache: 0,
    });

    return (
      <QueryProvider>
        <DeviceProvider>
          <AuthProvider>
            <NavBar />
            <MaxWidthWrapper className=" !pt-40 flex justify-center items-center min-h-screen">
              {!data.status ? (
                <Empty text="404 Page Not Found" />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: convertToHTML(data.page.content || "") }}
                  className={`  text-black lg:text-base m text-sm  font-medium my-2 leading-[1.7] `}
                />
              )}
            </MaxWidthWrapper>
            <Footer />
          </AuthProvider>
        </DeviceProvider>
      </QueryProvider>
    );
  } catch (error) {
    return <Empty text="404 Page Not Found" />;
  }
}
