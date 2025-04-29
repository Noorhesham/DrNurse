"use client";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const useFormHandler = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  /**
   * Reusable form handler
   * @param {Object} config - Configuration object
   * @param {Function} config.apiCall - Function to perform the API call
   * @param {Object} config.options - Options for the API call (e.g., resourceName, body)
   * @param {Function} config.onSuccess - Callback for successful request
   * @param {Function} config.onError - Callback for failed request
   * @param {Function} config.setError - React Hook Form's setError function
   */
  const handleFormSubmit = async ({
    apiCall,
    options,
    onSuccess,
    onError,
    setError,
  }: {
    apiCall: any;
    options: any;
    onSuccess?: any;
    onError?: any;
    setError?: any;
  }) => {
    startTransition(async () => {
      try {
        const res = await apiCall(options);

        if (res.status) {
          toast.success(res.message);
          onSuccess?.(res);
        } else {
          toast.error(res.message);

          if (res.errors) {
            Object.entries(res.errors).forEach(([field, messages]) => {
              setError?.(field, {
                type: "server",
                message: Array.isArray(messages) ? messages[0] : messages,
              });
            });
          }
          onError?.(res);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        toast.error(error||error.message || "An error occurred");
        onError?.(error);
      } finally {
        // Invalidate queries after completion
        queryClient.invalidateQueries(); // Adjust queryKey as needed
      }
    });
  };

  return { handleFormSubmit, isPending };
};
