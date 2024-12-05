"use client";
import React, { useTransition } from "react";
import FunctionalButton from "./FunctionalButton";
import { useDevice } from "../context/DeviceContext";
import cookies from "js-cookie";
import { Paperclip } from "lucide-react";
import { Server } from "../main/Server";

const CVdownload = ({ name }: { name: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <FunctionalButton
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const response = await Server({ resourceName: "cv" });

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
      className="w-full"
      btnText="DOWNLOAD CV"
      icon={<Paperclip className="w-5 h-5" />}
    />
  );
};

export default CVdownload;
