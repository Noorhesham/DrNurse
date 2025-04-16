"use client";
import React, { useTransition } from "react";
import { Server } from "../main/Server";
import { Button } from "@/components/ui/button";

const DownloadOffer = ({ id, name }: { id: string; name?: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const response = await Server({ resourceName: "download-offer", id });

          // Check if response contains base64Data
          if (response?.base64Data) {
            // Decode base64 string into binary
            const byteCharacters = atob(response.base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Create a Blob from the byte array and trigger a download
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${name}.pdf`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(link);
          } else {
            // Handle JSON response or other data types if necessary
            console.log(response);
          }
        });
      }}
      size={"lg"}
      variant={"outline"}
      className="font-semibold lg:w-[50%] text-main2 bg-light hover:bg-main2 hover:text-light duration-150"
    >
      DOWNLOAD OFFER
    </Button>
  );
};

export default DownloadOffer;
