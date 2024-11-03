"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+, use `next/navigation`

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="flex items-center sm:text-sm text-xs gap-2 text-gray-50">
      <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.0486 2.03639C5.39406 1.68492 5.39406 1.11507 5.04859 0.763603C4.70313 0.412132 4.14302 0.412133 3.79756 0.763605L0.261549 4.36112C0.253589 4.36915 0.245777 4.37734 0.23812 4.38568C0.0904089 4.54651 0 4.76251 0 5C0 5.12072 0.0233615 5.23589 0.065737 5.34108C0.108918 5.44852 0.173371 5.54918 0.259098 5.6364L3.79756 9.2364C4.14302 9.58787 4.70313 9.58787 5.04859 9.2364C5.39406 8.88492 5.39406 8.31508 5.04859 7.9636L3.02026 5.89999H22.1154C22.6039 5.89999 23 5.49705 23 5C23 4.50294 22.6039 4.1 22.1154 4.1H3.02027L5.0486 2.03639Z"
          fill="white"
        />
      </svg>
      BACK
    </button>
  );
};

export default BackButton;
