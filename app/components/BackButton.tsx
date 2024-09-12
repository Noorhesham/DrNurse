"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+, use `next/navigation`
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  useEffect(() => {
    // Store the current path without search params in sessionStorage
    const handlePopState = () => {
      const cleanPath = window.location.pathname; // Remove query params
      sessionStorage.setItem("lastCleanPath", cleanPath);
    };

    // Store the initial path when the component mounts
    handlePopState();

    // Listen to the popstate event to detect back and forward navigation
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleBack = () => {
    const lastCleanPath = sessionStorage.getItem("lastCleanPath");
    if (lastCleanPath && lastCleanPath !== window.location.pathname) {
      router.push(lastCleanPath);
    } else {
      router.back(); // Fallback to router.back() if no clean path is stored
    }
  };

  return (
    <button onClick={handleBack} className="flex items-center sm:text-sm text-xs gap-2 text-gray-50">
      <ArrowLeft className="w-4 h-4 md:w-8 md:h-8" /> BACK
    </button>
  );
};

export default BackButton;
