"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { APIURL } from "../constants";

// Constants
const VERSION = "v1";

// Types for Method and Resource Names
export type MethodProps = "GET" | "POST" | "PUT" | "DELETE";
export type ResourceNameProps =
  | "user"
  | "posts"
  | "login"
  | "signup"
  | "MGS"
  | "reset"
  | "verify"
  | "validate"
  | "token"
  | "logout"
  | "tfaSend"
  | "tfaValidate"
  | "update_password"
  | "update_profile"
  | "remove_account"
  | "tfaActivate"
  | "getDevices"
  | "deviceLogout"
  | "languageUpdate"
  | "getEntity"
  | "getSingleEntity"
  | "notificationToken"
  | "postgeneralForm"
  | "my-profile"
  | "add-profile"
  | "countries"
  | "cities"
  | "states"
  | "companies"
  | "add-hospital"
  | "home"
  | "company"
  | "update-hospital"
  | "about-us"
  | "controlManagers"
  | "getJobs"
  | "add-job"
  | "addWishlist"
  | "getManagers"
  | "update-managers"
  | "wishlistStatus"
  | "company-jobs"
  | "job"
  | "update-job"
  | "lock-job"
  | "duplicate"
  | "getProfiles"
  | "company-overview"
  | "person-overview"
  | "doctor"
  | "apply-job"
  | "applicants"
  | "points"
  | "prizes"
  | "reedem"
  | "slots"
  | "add-slot"
  | "delete-slot"
  | "update-slot"
  | "add-points"
  | "meetings"
  | "sendInvite"
  | "cancelInvite"
  | "person-slots"
  | "book"
  | "cancel-book"
  | "person-meetings"
  | "add-offer"
  | "offers"
  | "person-offers"
  | "offerAction"
  | "reoffer"
  | "negotiate"
  | "cancel-offer"
  | "bookmarks"
  | "check-bookmarks"
  | "getBranches"
  | "offer"
  | "update-offer"
  | "getForms"
  | "submitForm"
  | "subs"
  | "my-subs"
  | "my-invoices"
  | "payment"
  | "pay-invoice"
  | "subscribe"
  | "classification"
  | "classify"
  | "cv"
  | "download-offer"
  | "start-meet"
  | "create-verification"
  | "verify-account"
  | "contact-doctor";

// Function to get the full URL from the resource name
const getURL = (
  resourceName: ResourceNameProps,
  id?: string,
  entityName?: string,
  queryParams?: URLSearchParams | string
) => {
  const url = `${APIURL}/api`;
  switch (resourceName) {
    case "user":
      return { url: `${url}/rm_users`, method: "GET" as MethodProps };
    case "login":
      return { url: `${url}/rm_users/${VERSION}/create_authentication`, method: "POST" };
    case "signup":
      return { url: `${url}/rm_users/${VERSION}/registration`, method: "POST" };
    case "posts":
      return { url: `${url}/posts`, method: "GET" };
    case "MGS":
      return { url: `${url}/rm_users/${VERSION}/start_app`, method: "POST" };
    case "reset":
      return { url: `${url}/rm_users/${VERSION}/forget_password`, method: "POST" };
    case "verify":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/send`, method: "POST" };
    case "validate":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/validate`, method: "POST" };
    case "token":
      return { url: `${url}/rm_users/${VERSION}/authentication`, method: "POST" };
    case "logout":
      return { url: `${url}/rm_users/${VERSION}/log_out`, method: "POST" };
    case "tfaSend":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/send`, method: "POST" };
    case "tfaActivate":
      return { url: `${url}/rm_users/${VERSION}/tfa/activate`, method: "POST" };
    case "tfaValidate":
      return { url: `${url}/rm_users/${VERSION}/tfa/${id}/validate`, method: "POST" };
    case "update_profile":
      return { url: `${url}/rm_users/${VERSION}/update_profile`, method: "POST" };
    case "update_password":
      return { url: `${url}/rm_users/${VERSION}/update_password`, method: "POST" };
    case "remove_account":
      return { url: `${url}/rm_users/${VERSION}/remove_account`, method: "POST" };
    case "getDevices":
      return { url: `${url}/rm_users/${VERSION}/devices/get`, method: "GET" };
    case "deviceLogout":
      return { url: `${url}/rm_users/${VERSION}/devices/stop`, method: "POST" };
    case "languageUpdate":
      return { url: `${url}/rm_users/${VERSION}/device_sys`, method: "POST" };
    // case "my-device":
    //   return { url: `${url}/rm_users/${VERSION}/device_sys`, method: "POST" };
    case "getEntity":
      return {
        url: `${url}/${entityName}/entities-operations${queryParams ? `?${queryParams.toString()}` : ""}`,
        method: "GET",
      };
    case "getBranches":
      return { url: `${url}/branch/entities-operations?itemsCount=200&${queryParams}`, method: "GET" };
    case "getSingleEntity":
      return { url: `${url}/${entityName}/entities-operations/${id}`, method: "GET" };
    case "notificationToken":
      return { url: `${url}/rm_users/${VERSION}/device_sys`, method: "POST" };
    case "postgeneralForm":
      return { url: `${url}/forms/general-form`, method: "POST" };
    case "my-profile":
      return { url: `${url}/recruitment/profile`, method: "GET" };
    case "add-profile":
      return { url: `${url}/recruitment/profiles/update`, method: "POST" };
    case "countries":
      return { url: `${url}/countries/entities-operations?itemsCount=200&${queryParams}`, method: "GET" };
    case "cities":
      return { url: `${url}/info-cities/entities-operations?state_id=${id}&itemsCount=200`, method: "GET" };
    case "states":
      return {
        url: `${url}/states/entities-operations?itemsCount=200&country_id=${id}`,
        method: "GET",
      };
    case "company":
      return {
        url: `${url}/recruitment/companies/${id}`,
        method: "GET",
      };
    case "companies":
      return {
        url: `${url}/recruitment/dircompanies/managers/companies`,
        method: "GET",
      };
    case "add-hospital":
      return { url: `${url}/dircompanies/entities-operations/store`, method: "POST" };
    case "home":
      return { url: `${url}/rm_page/${VERSION}/show?slug=${id}`, method: "GET" };
    case "update-hospital":
      return { url: `${url}/dircompanies/entities-operations/${id}/update`, method: "POST" };
    case "about-us":
      return { url: `${url}/rm_page/${VERSION}/show?slug=about-us`, method: "GET" };
    case "controlManagers":
      return { url: `${url}/recruitment/dircompanies/managers`, method: "GET" };
    case "getJobs":
      return { url: `${url}/recruitment/jobs?${queryParams}`, method: "GET" };
    case "add-job":
      return { url: `${url}/req-job-posts/entities-operations/store`, method: "POST" };
    case "update-job":
      return { url: `${url}/req-job-posts/entities-operations/${id}/update`, method: "PUT" };
    case "addWishlist":
      return { url: `${url}/req-job-posts/entities-operations/${id}/bookmarks`, method: "POST" };
    case "update-managers":
      return { url: `${url}/recruitment/dircompanies/managers`, method: "PUT" };
    case "wishlistStatus":
      return { url: `${url}/req-job-posts/entities-operations/${id}/bookmarked`, method: "GET" };
    case "company-jobs":
      return { url: `${url}/recruitment/req-job-posts/jobs?${queryParams}`, method: "GET" };
    case "job":
      return { url: `${url}/recruitment/jobs/${id}`, method: "GET" };
    case "lock-job":
      return { url: `${url}/recruitment/req-job-posts/status`, method: "PUT" };
    case "duplicate":
      return { url: `${url}/recruitment/req-job-posts/duplicate`, method: "POST" };
    case "getProfiles":
      return { url: `${url}/recruitment/profiles?${queryParams}`, method: "GET" };
    case "company-overview":
      return { url: `${url}/recruitment/companies/overview`, method: "GET" };
    case "person-overview":
      return { url: `${url}/recruitment/person/overview`, method: "GET" };
    case "doctor":
      return { url: `${url}/recruitment/profiles/${id}`, method: "GET" };
    case "apply-job":
      return { url: `${url}/recruitment/jobs/applay`, method: "POST" };
    case "applicants":
      return { url: `${url}/recruitment/jobs/${id}/applicants?${queryParams}`, method: "GET" };
    case "points":
      return { url: `${url}/rm_pointsys/${VERSION}/history`, method: "GET" };
    case "prizes":
      return { url: `${url}/rm_pointsys/${VERSION}/prizes`, method: "GET" };
    case "reedem":
      return { url: `${url}/redeem-requests/entities-operations/store`, method: "POST" };
    case "slots":
      return { url: `${url}/recruitment/meetings/slots?job_id=${id}&${queryParams}`, method: "GET" };
    case "add-slot":
      return { url: `${url}/recruitment/meetings/slots`, method: "POST" };
    case "delete-slot":
      return { url: `${url}/recruitment/meetings/slots/${id}`, method: "DELETE" };
    case "meetings":
      return { url: `${url}/recruitment/meetings${id ? `?job_id=${id}` : ""}`, method: "GET" };
    case "sendInvite":
      return { url: `${url}/recruitment/meetings/invite`, method: "POST" };
    case "cancelInvite":
      return { url: `${url}/recruitment/meetings/cancel`, method: "POST" };
    case "person-slots":
      return { url: `${url}/recruitment/person/meetings/slots?${queryParams}`, method: "GET" };
    case "book":
      return { url: `${url}/recruitment/person/meetings/book`, method: "POST" };
    case "cancel-book":
      return { url: `${url}/recruitment/person/meetings/cancel`, method: "POST" };
    case "person-meetings":
      return { url: `${url}/recruitment/person/meetings`, method: "GET" };
    case "add-offer":
      return { url: `${url}/recruitment/job-offers`, method: "POST" };
    case "offers":
      return { url: `${url}/recruitment/job-offers?${queryParams}`, method: "GET" };
    case "person-offers":
      return { url: `${url}/recruitment/person/job-offers`, method: "GET" };
    case "offerAction":
      return { url: `${url}/recruitment/person/job-offers/action`, method: "POST" };
    case "reoffer":
      return { url: `${url}/recruitment/job-offers/re-offer`, method: "POST" };
    case "cancel-offer":
      return { url: `${url}/recruitment/job-offers/cancel`, method: "POST" };
    case "negotiate":
      return { url: `${url}/recruitment/person/job-offers/negotiate`, method: "POST" };
    case "check-bookmarks":
      return { url: `${url}/req-job-posts/entities-operations/${id}/bookmarked`, method: "GET" };
    case "bookmarks":
      return {
        url: `${url}/req-job-posts/entities-operations/bookmarks/list?${queryParams}`,
        method: "GET",
      };
    case "offer":
      return { url: `${url}/recruitment/job-offers/${id}`, method: "GET" };
    case "update-offer":
      return { url: `${url}/recruitment/job-offers/${id}`, method: "POST" };
    case "getForms":
      return { url: `${url}/forms/getForms`, method: "POST" };
    case "submitForm":
      return { url: `${url}/forms/${id}/submit`, method: "POST" };
    case "subs":
      return { url: `${url}/sub-subscription-plans/entities-operations?with=features`, method: "GET" };
    case "my-subs":
      return { url: `${url}/sub-subscriptions/entities-operations?with=features,currency_id`, method: "GET" };
    case "my-invoices":
      return { url: `${url}/inv-invoices/entities-operations?with=features,plan_id,currency_id`, method: "GET" };
    case "payment":
      return { url: `${url}/rm_payment_gateways/v1/available`, method: "GET" };
    case "subscribe":
      return { url: `${url}/rm_subscriptions_system/v1/subscriptions/subscribe`, method: "POST" };
    case "pay-invoice":
      return { url: `${url}/rm_invoices_system/${VERSION}/invoices/${id}/pay`, method: "POST" };
    case "classification":
      return { url: `${url}/classifications/entities-operations`, method: "GET" };
    case "classify":
      return { url: `${url}/recruitment/jobs/classify`, method: "POST" };
    case "cv":
      return { url: `${url}/recruitment/cv-download`, method: "GET" };
    case "download-offer":
      return { url: `${url}/recruitment/job-offers/${id}/download`, method: "GET" };
    case "start-meet":
      return { url: `${url}/recruitment/meetings/${id}/custom/start-url`, method: "GET" };
    case "create-verification":
      return { url: `${url}/rm_users/${VERSION}/account_verification/create`, method: "POST" };
    case "verify-account":
      return { url: `${url}/rm_users/${VERSION}/account_verification/${id}/validate-account-code`, method: "POST" };
    case "contact-doctor":
      return { url: `${url}/recruitment/profiles/${id}/contacts`, method: "GET" };
    default:
      return { url, method: "GET" as MethodProps };
  }
};

// Server Request Function
export async function Server({
  resourceName,
  id,
  method,
  body,
  headers,
  noHeaders = false,
  cache = 0,
  formData = false,
  entityName,
  queryParams,
  nocompany,
}: {
  resourceName: ResourceNameProps;
  id?: string;
  method?: MethodProps;
  body?: any;
  headers?: any;
  noHeaders?: boolean;
  cache?: number;
  formData?: boolean;
  entityName?: string;
  queryParams?: URLSearchParams | string;
  nocompany?: boolean;
}) {
  // Get the token and device info from cookies
  const jwt = cookies().get("jwt")?.value;
  const deviceId = cookies().get("device_info")?.value || "{}";
  const hospitalId = cookies().get("hospitalId")?.value;
  const lang = cookies().get("NEXT_LOCALE")?.value || "en";
  // Set up headers
  const combinedHeaders: { [key: string]: string } = {
    ...headers,
  };

  if (jwt && jwt !== "undefined" && !noHeaders) {
    combinedHeaders.Authorization = `Bearer ${jwt}`;
  }
  if (deviceId) {
    combinedHeaders["device-unique-id"] = JSON.parse(deviceId).device_unique_id;
  }
  if (hospitalId && !nocompany) {
    combinedHeaders["company-id"] = hospitalId;
  }
  combinedHeaders["lang"] = lang;
  try {
    // Get the URL and method from the resource name
    const { url, method: resolvedMethod } = getURL(resourceName, id, entityName, queryParams);
    console.log(url, hospitalId);
    // Fetch data from the server
    let requestBody;
    if (formData) requestBody = body;
    else {
      requestBody = body ? JSON.stringify(body) : undefined;
      combinedHeaders["Content-Type"] = "application/json";
    }
    const response = await fetch(url, {
      method: method || resolvedMethod,
      headers: combinedHeaders,
      body: requestBody,
      next: {
        revalidate: cache ? cache : 0,
        tags: cache ? [`${resourceName}-${queryParams}`] : [],
      },
    });
    // if (!response.ok) throw new Error(`Error: ${response.status}`);
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/pdf")) {
      const arrayBuffer = await response.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");

      return { base64Data };
    }
    const data = await response.json();
    if (
      data.message === "Device token mismatch" ||
      data.message === "Login again please" ||
      data.message === "تسجيل الدخول مرة أخرى من فضلك" ||
      response.status === 401
    ) {
      redirect("/login?error=true");
    }

    return data;
  } catch (error: any) {
    console.log("Server request error:", error);
    if (isRedirectError(error)) {
      throw error;
    }
    if (error.message === "Device token mismatch" || error.message === "Login again please" || error.status === 401) {
      redirect("/login?error=true");
    }
    throw new Error(`Error: ${error.message}`);
  }
}
