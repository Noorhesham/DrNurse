import { revalidatePath, revalidateTag } from "next/cache";

// Helper to get today's date in yyyyMMdd format
const getTodayString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const pass = searchParams.get("pass");
  const today = getTodayString();

  const secretPrefix = "FOKHJEUOIijf342ii-";

  if (pass !== `${secretPrefix}${today}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("✅ Password correct, starting revalidation...");
  revalidatePath("/");
  revalidateTag("colortrend");
  revalidateTag("countries");
  revalidateTag("getForms");
  revalidateTag("getinspired");
  revalidateTag("getEntity");
  console.log("✅ Revalidation done.");

  return new Response("Revalidated", { status: 200 });
};
