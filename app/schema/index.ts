import { z } from "zod";

const phoneRegex = /^[0-9]{10,14}$/; // Adjust this regex based on your specific phone number requirements

// Example usage of Next Intl's translation
export const phoneSchema = (t: any) =>
  z.object({
    phone: z.string().min(10, { message: t("validationAuth.phoneMin") }),
  });

export const loginSchema = (t: any) =>
  z
    .object({
      useEmail: z.boolean(),
      username: z.string(),
      password: z.string().min(4, { message: t("validationAuth.passwordMin", { length: 4 }) }),
    })
    .refine(
      (data) => {
        if (data.useEmail) {
          return z
            .string()
            .email({ message: t("validationAuth.invalidEmail") })
            .safeParse(data.username).success;
        } else {
          return phoneRegex.test(data.username);
        }
      },
      {
        message: t("validationAuth.invalidEmailOrPhone"),
        path: ["username"],
      }
    );

export const signupSchema = (t: any) =>
  z.object({
    name: z.string().min(3, { message: t("validationAuth.nameMin", { length: 3 }) }),
    phone: z.any(),
    email: z.string().email({ message: t("validationAuth.invalidEmail") }),
    password: z
      .string()
      .min(8, { message: t("validationAuth.passwordMin", { length: 8 }) })
      .regex(/[A-Z]/, { message: t("validationAuth.passwordUpper") })
      .regex(/[0-9]/, { message: t("validationAuth.passwordNumber") })
      .regex(/[^A-Za-z0-9]/, { message: t("validationAuth.passwordSpecial") }),
    referral_code: z.string().optional(),
    register_as: z.string().min(1, { message: t("validationAuth.registerAsRequired") }),
  });

export const resetPasswordSchemaPrepare = (t: any) =>
  z
    .object({
      username: z.string(),
      useEmail: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.useEmail) {
          return z
            .string()
            .email({ message: t("validationAuth.invalidEmail") })
            .safeParse(data.username).success;
        } else {
          return phoneRegex.test(data.username);
        }
      },
      {
        message: t("validationAuth.invalidEmailOrPhone"),
        path: ["username"],
      }
    );

export const resetPasswordForgot = (t: any) =>
  z.object({
    code: z.string(),
  });

export const contactUsSchema = (t: any) =>
  z.object({
    name: z.string().min(1, { message: t("validationAuth.nameRequired") }),
    phone: z.string().min(10, { message: t("validationAuth.phoneMin", { length: 10 }) }),
    email: z.string().email({ message: t("validationAuth.invalidEmail") }),
    inquiry: z.string().optional(),
    message: z.string().min(5, { message: t("validationAuth.messageMin", { length: 5 }) }),
  });

export const forgotPasswordSchema2 = (t: any) =>
  z.object({
    password: z
      .string()
      .min(6, { message: t("validationAuth.passwordMin", { length: 6 }) })
      .regex(/[A-Z]/, { message: t("validationAuth.passwordUpper") })
      .regex(/[0-9]/, { message: t("validationAuth.passwordNumber") })
      .regex(/[^A-Za-z0-9]/, { message: t("validationAuth.passwordSpecial") }),
  });

export const notifictationsSchema = (t: any) =>
  z.object({
    active: z.boolean(),
  });

export const personalSchema = (t: any) =>
  z.object({
    name: z.string(),
    birth_day: z.any(),
    avatar: z.any().optional(),
  });

export const commentSchema = (t: any) =>
  z.object({
    content: z.string(),
    rating: z.number(),
  });

export const emailSchema = (t: any) =>
  z.object({
    email: z.string().email({ message: t("validationAuth.invalidEmail") }),
  });
