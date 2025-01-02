import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertToHTML(input: string) {
  let html = input;

  // Convert <strong> and <em> tags
  html = html.replace(/<strong>([^<]+)<\/strong>/g, "<strong>$1</strong>");
  html = html.replace(/<em>([^<]+)<\/em>/g, "<em>$1</em>");

  // Convert <p> tags
  html = html.replace(/<p>([^<]+)<\/p>/g, "<p>$1</p>");

  // Convert <ol> and <li> tags
  //@ts-ignore
  html = html.replace(/<ol>(.*?)<\/ol>/gs, "<ol>$1</ol>");
  html = html.replace(/<li>([^<]+)<\/li>/g, "<li>$1</li>");

  // Convert <h2> tags with class attributes
  html = html.replace(/<h2 class="([^"]+)" levels="2">([^<]+)<\/h2>/g, '<h2 class="$1">$2</h2>');

  // Convert <h3> tags with class attributes
  html = html.replace(/<h3 class="([^"]+)" levels="3">([^<]+)<\/h3>/g, '<h3 class="$1">$2</h3>');

  // Convert <h4> tags with class attributes
  html = html.replace(/<h4 class="([^"]+)" levels="4">([^<]+)<\/h4>/g, '<h4 class="$1">$2</h4>');

  // Convert <div> tags with class attributes
  html = html.replace(/<div class="([^"]+)">([^<]+)<\/div>/g, '<div class="$1">$2</div>');

  return html;
}
// utils/seo.ts
type MetadataProps = {
  title: string;
  description: string;
  url: string;
  image?: string; // Optional: For Open Graph and Twitter cards
  type?: string; // Default to "article" for blog pages
};

export function generateMetadataCustom({
  title,
  description,
  url,
  image = "/default-image.png", // Fallback image URL
  type = "article",
}: MetadataProps) {
  const fullTitle = `${title} | Dr.Nurse`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, rates: any[]) {
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error("Invalid currency provided.");
  }

  // Convert the amount from the source currency to USD
  const amountInUSD = amount / rates[fromCurrency];

  // Convert the amount from USD to the target currency
  const convertedAmount = amountInUSD * rates[toCurrency];

  return convertedAmount;
}
