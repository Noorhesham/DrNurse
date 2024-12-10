import { CloudUploadIcon, FileIcon, ReplaceIcon, Trash2Icon } from "lucide-react"; // Import Trash2Icon for the remove button
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import MiniTitle from "../defaults/MiniTitle";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface FileUploadProps {
  label: string;
  name: string;
  multiple?: boolean;
  noicon?: boolean;
  mimeTypes?: string[]; // Acceptable MIME types
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  multiple = false,
  noicon = false,
  mimeTypes = ["image/*", "application/pdf"], // Accept images and PDFs by default
}) => {
  const { setValue, getValues, formState } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null); // State to store file preview URL or icon
  const [isPdf, setIsPdf] = useState(false); // State to track if the file is a PDF
  const [hasDefault, setHasDefault] = useState<boolean>(false); // State to check if there's a default file

  const defaultFile = getValues(name) || formState.defaultValues?.[name]; // Get default file

  useEffect(() => {
    // If there is a default file, handle the preview
    if (defaultFile && typeof defaultFile === "object") {
      if (defaultFile.thumbnail) {
        setPreview(defaultFile.thumbnail);
        setHasDefault(true);
      } else if (defaultFile.type === "application/pdf") {
        setIsPdf(true);
        setHasDefault(true);
      }
    }
  }, [defaultFile]);
  console.log(preview);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files ? files[0] : null;
    if (file) {
      setValue(name, multiple ? files : file, { shouldValidate: true });

      const fileType = file.type;

      if (fileType.includes("image")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string); // Set preview URL for image
          setIsPdf(false); // Reset PDF state
          setHasDefault(false); // New file, no default
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
      } else if (fileType === "application/pdf") {
        setPreview(file); // No image preview for PDFs
        setIsPdf(true); // Set PDF state
        setHasDefault(false); // New file, no default
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setIsPdf(false);
    setHasDefault(false);
    setValue(name, multiple ? [] : null, { shouldValidate: true });
  };

  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2 items-start">
      <MiniTitle size={noicon ? "sm" : "md"} text={label} />
      {noicon ? (
        <Input
          multiple={multiple}
          className="mt-auto shadow-sm w-full"
          type="file"
          name={name}
          accept={mimeTypes.join(", ")} // Accept both images and PDFs
          onChange={handleFileChange}
        />
      ) : (
        <label className="px-4 py-2 cursor-pointer flex flex-col w-full">
          <input
            type="file"
            name={name}
            accept={mimeTypes.join(", ")} // Accept both images and PDFs
            onChange={handleFileChange}
            multiple={multiple}
            className="hidden"
          />
          <div className="border-2 rounded-xl flex-col border-dashed border-gray-400 w-full h-44 bg-gray-100 flex items-center justify-center text-center text-gray-500 hover:bg-gray-100 relative">
            {preview || isPdf ? (
              <>
                {isPdf ? (
                  <div className="flex flex-col items-center">
                    <FileIcon size={40} />
                    <span className="text-xs mt-2">{(preview as any)?.name || ""}</span>
                    <span className="text-xs mt-2">{(defaultFile as any)?.title || ""}</span>
                  </div>
                ) : (
                  <Link
                    href={(defaultFile as any)?.file || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full h-32 aspect-square block"
                  >
                    <Image
                      fill
                      src={preview || ""}
                      alt="Selected file preview"
                      className="object-contain  rounded-xl"
                    />
                  </Link>
                )}
                <button
                  onClick={handleRemove}
                  className="absolute top-2 z-40 right-2 bg-main2 text-white rounded-full p-1 !important"
                >
                  <ReplaceIcon size={16} />
                </button>
              </>
            ) : (
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
      )}
    </div>
  );
};

export default FileUpload;
