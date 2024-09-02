"use client";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DeviceContext = createContext<
  | {
      device_info: {
        device_unique_id: string;
        operating_system: string;
        type: string;
        operating_system_version: string;
      };
      setDeviceUniqueId: any;
    }
  | undefined
>(undefined);
const generateUniqueId = (os: string, version: string) => {
  const randomComponent = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return `${version}${randomComponent}`;
};
const getDeviceType = () => {
  const ua = global?.window?.navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const operating_system = global?.window?.navigator.appVersion;
  const operating_system_version = operating_system?.split(" ")[0];
  const [device_info, setDeviceUniqueId] = useLocalStorageState(
    {
      device_unique_id: generateUniqueId(operating_system, operating_system_version),
      operating_system,
      operating_system_version,
      type: getDeviceType(),
    },
    "device_info",
    true
  );
  return <DeviceContext.Provider value={{ device_info, setDeviceUniqueId }}>{children}</DeviceContext.Provider>;
};
const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export { DeviceProvider, useDevice };
// "use client";
// import React, { createContext, useContext, useEffect } from "react";
// import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Define TypeScript types for device information
// type DeviceInfo = {
//   device_unique_id: string;
//   operating_system: string;
//   type: string;
//   operating_system_version: string;
// };

// // Define the context type
// type DeviceContextType = {
//   device_info: DeviceInfo;
//   setDeviceUniqueId: (device_info: DeviceInfo) => void;
// };

// // Create a context with an undefined initial value
// const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// // Function to generate a unique device ID
// const generateUniqueId = () => {
//   const randomComponent = Date.now().toString(36) + Math.random().toString(36).substr(2);
//   return randomComponent;
// };

// // Function to get the type of the device
// const getDeviceType = () => {
//   if (typeof window !== "undefined") {
//     const ua = window.navigator.userAgent;
//     if (/mobile/i.test(ua)) return "Mobile";
//     if (/tablet/i.test(ua)) return "Tablet";
//   }
//   return "Desktop";
// };

// DeviceProvider component to provide device context
// const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
//   // Fetch operating system details safely, ensuring that it only runs on the client
//   const getOperatingSystem = () => {
//     if (typeof window !== "undefined") {
//       const userAgent = window.navigator.userAgent;
//       const platform = window.navigator.platform;

//       if (/Win/i.test(platform)) return "Windows";
//       if (/Mac/i.test(platform)) return "macOS";
//       if (/Linux/i.test(platform)) return "Linux";
//       if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
//       if (/Android/i.test(userAgent)) return "Android";
//     }
//     return "Unknown OS";
//   };

//   const getOperatingSystemVersion = () => {
//     if (typeof window !== "undefined") {
//       const appVersion = window.navigator.appVersion;
//       return appVersion.split(" ")[0];
//     }
//     return "Unknown Version";
//   };

//   // Retrieve device information
//   const operating_system = getOperatingSystem();
//   const operating_system_version = getOperatingSystemVersion();
//   const device_type = getDeviceType();

//   // Use local storage state to persist device information
//   const [device_info, setDeviceUniqueId] = useLocalStorageState<DeviceInfo>(
//     {
//       device_unique_id: generateUniqueId(),
//       operating_system,
//       operating_system_version,
//       type: device_type,
//     },
//     "device_info",
//     true
//   );

//   // Ensure device info is updated correctly when the component mounts
//   useEffect(() => {
//     setDeviceUniqueId({
//       device_unique_id: generateUniqueId(),
//       operating_system,
//       operating_system_version,
//       type: device_type,
//     });
//   }, [operating_system, operating_system_version, device_type]);

//   return <DeviceContext.Provider value={{ device_info, setDeviceUniqueId }}>{children}</DeviceContext.Provider>;
// };

// // Custom hook to use device context
// const useDevice = () => {
//   const context = useContext(DeviceContext);
//   if (!context) {
//     throw new Error("useDevice must be used within a DeviceProvider");
//   }
//   return context;
// };

// export { DeviceProvider, useDevice };
