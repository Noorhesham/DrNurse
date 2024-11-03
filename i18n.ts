import { notFound, redirect } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Define supported locales
const locales = ["en", "ar"];
const defaultLocale = "en"; // Define your default locale here

export default getRequestConfig(async ({ locale }) => {
  // Check if the locale is valid
  if (!locales.includes(locale as string)) {
    // Redirect to default locale if the locale is invalid
    return redirect(`/${defaultLocale}`);
  }

  try {
    // Import the messages dynamically based on the locale
    const messages = (await import(`./messages/${locale}.json`)).default;
    return {
      messages,
    };
  } catch (error) {
    // Handle errors such as file not found
    console.error(`Error loading messages for locale ${locale}`, error);
    return notFound();
  }
});
