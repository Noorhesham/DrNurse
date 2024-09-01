import { CloudUploadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import MiniTitle from "../MiniTitle";

const FileUpload = ({ label, name, multiple = false }: { label: string; name: string; multiple?: boolean }) => {
  const form = useFormContext();
  const [preview, setPreview] = useState(null); // State to store file preview URL
  const handleFileChange = (e: any) => {
    const files = e.target.files;
    form.setValue(name, multiple ? files : files[0]);

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set preview URL or data
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 items-start">
      <MiniTitle size="md" text={label} />
      <label className="px-4 py-2 cursor-pointer flex flex-col w-full">
        <input type="file" name={name} onChange={handleFileChange} multiple={multiple} className="hidden" />
        <div className="border-2 rounded-xl flex-col border-dashed border-gray-400 w-full h-44 bg-gray-100 flex items-center justify-center text-center text-gray-500 hover:bg-gray-100">
          {preview ? ( // If a preview is available, display it
            <img src={preview} alt="Selected file preview" className="object-cover w-full h-full rounded-xl" />
          ) : (
            // Otherwise, display the cloud upload icon and text
            <>
              <CloudUploadIcon size={45} />
              <span className="text-xs text-gray-500">
                <strong>Browse photo</strong> or drop here
              </span>
              <p className="text-[12px] mt-1 max-w-40 text-muted-foreground">{t("imageUploadDesc")}</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
