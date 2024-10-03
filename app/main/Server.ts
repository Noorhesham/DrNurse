"use server";
import { cookies } from "next/headers";

// Constants
const BASE_URL = "https://lab.r-m.dev/api";
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
  | "states";

// Function to get the full URL from the resource name
const getURL = (resourceName: ResourceNameProps, id?: string, entityName?: string, queryParams?: URLSearchParams) => {
  const url = BASE_URL;
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
    case "getEntity":
      return {
        url: `${url}/${entityName}/entities-operations${queryParams ? `?${queryParams.toString()}` : ""}`,
        method: "GET",
      };
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
      return { url: `${url}/info-cities/entities-operations?state_id=${id}`, method: "GET" };
    case "states":
      return {
        url: `${url}/states/entities-operations?itemsCount=200&country_id=${id}`,
        method: "GET",
      };
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
  queryParams?: URLSearchParams;
}) {
  // Get the token and device info from cookies
  const jwt = cookies().get("jwt")?.value;
  const deviceId = cookies().get("device_info")?.value;

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

  try {
    // Get the URL and method from the resource name
    const { url, method: resolvedMethod } = getURL(resourceName, id, entityName, queryParams);
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
        tags: cache ? [`${resourceName}`] : [],
      },
    });
    console.log(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    if (data.message === "Device token mismatch" || data.message === "Login again please") {
      cookies().delete("jwt");
    }
    console.log(data, body);
    return data;
  } catch (error: any) {
    if (error.message === "Device token mismatch" || error.message === "Login again please") {
      cookies().delete("jwt");
    }
    console.error("Server request error:", error);
    throw new Error(`Error: ${error.message}`);
  }
}
