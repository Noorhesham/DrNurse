"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import cookies from "js-cookie";
import { Server } from "../main/Server";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useDevice } from "./DeviceContext";
interface AuthContextType {
  generalSettings: any;
  userSettings: any;
  user2Settings: any;
  handleLogout: () => void;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
interface UpdateFnParams {
  checker: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  key: string;
  dateKey: string;
  setDates: React.Dispatch<React.SetStateAction<any>>;
  queryClient: QueryClient;
  status: boolean;
}
/**
 * Function to update state and cache data.
 *
 * @param checker - The data returned from the server that needs to be checked and updated.
 * @param setState - The state setter function to update the local state.
 * @param key - The key used to identify the query in the cache.
 * @param dateKey - The key used to update the corresponding date in local storage.
 * @param setDates - The function to update the date in local storage.
 * @param queryClient - The query client used to interact with the cache.
 * @param status - The status of the response to determine if the update should proceed.
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const updateFn = ({ checker, setState, key, dateKey, setDates, queryClient, status }: UpdateFnParams) => {
  if (checker || (!queryClient.getQueryData([key]) && status !== false)) {
    setState(checker);
    queryClient.setQueryData([key], checker);
    setDates((prevDates: any) => ({
      ...prevDates,
      [dateKey]: checker?.last_update_date,
    }));
  } else {
    // Keep the current state if no updates
    setState((prev: any) => prev || queryClient.getQueryData([key]));
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { deviceInfo } = useDevice();
  const [login, setLogin] = useState<any>(false);
  const [dates, setDates] = useLocalStorageState(
    {
      last_update_date_general: "",
      last_update_date_user: "",
      last_update_date_user2: "",
    },
    "dates"
  );
  const token = cookies.get("jwt");
  const [generalSettings, setGeneralSettings] = useState<any>(() => queryClient.getQueryData(["general_settings"]));
  const [userSettings, setUserSettings] = useState<any>(() => queryClient.getQueryData(["user_settings"]));
  const [user2Settings, setUser2Settings] = useState<any>(() => queryClient.getQueryData(["user2_settings"]));
  const [loading, setLoading] = useState(true);
  console.log("auth context", generalSettings, userSettings, user2Settings);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Server({
          resourceName: "MGS",
          body: {
            needed: ["general_settings", "user_settings", "user2_settings", "check_auth"],
            token,
            last_update_date_general: dates.last_update_date_general,
            last_update_date_user: dates.last_update_date_user,
            last_update_date_user2: dates.last_update_date_user2,
            device_id: deviceInfo.device_unique_id,
          },
        });
        console.log(res.general_settings, res.user_settings, res.user2_settings);
        // Handle general settings

        updateFn({
          checker: res.general_settings.data,
          setState: setGeneralSettings,
          key: "general_settings",
          dateKey: "last_update_date_general",
          setDates,
          queryClient,
          status: res.general_settings.status,
        });
        updateFn({
          checker: res.user_settings.data,
          setState: setUserSettings,
          key: "user_settings",
          dateKey: "last_update_date_user",
          setDates,
          queryClient,
          status: res.user_settings.status,
        });
        console.log(res.user_settings, res.user2_settings, res.general_settings);
        updateFn({
          checker: res.user2_settings?.data,
          setState: setUser2Settings,
          key: "user2_settings",
          dateKey: "last_update_date_user2",
          setDates,
          queryClient,
          status: res.user2_settings.status,
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [login]);
  // useLayoutEffect(() => {
  //   console.log(queryClient.getQueryData(["general_settings"]), "asdadsadsadasdasdsad  ");
  //   if (!queryClient.getQueryData(["general_settings"])) {
  //     setLogin(false);
  //     setDates((prevDates: any) => ({
  //       ...prevDates,
  //       last_update_date_general: "",
  //     }));
  //   }
  // }, []);
  const handleLogout = () => {
    setLoading(true);
    cookies.remove("jwt");
    queryClient.removeQueries({ queryKey: ["user_settings"] });
    queryClient.removeQueries({ queryKey: ["user2_settings"] });
    const newDates = {
      last_update_date_general: dates.last_update_date_general,
      last_update_date_user: "",
      last_update_date_user2: "",
    };
    setDates(newDates);
    setUserSettings(undefined);
    setUser2Settings(undefined);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ generalSettings, userSettings, user2Settings, handleLogout, setLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
