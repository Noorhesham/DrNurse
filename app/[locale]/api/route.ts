import { revalidateTag } from "next/cache";

export const POST = async (res,req) => {
  console.log(req)
  revalidateTag("home");
  console.log('successfully revalidated ')
  return new Response("Hello, Next.js!");
};
