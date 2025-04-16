"use client";
import { createContext, use, useContext, useEffect, useLayoutEffect, useState } from "react";
import cookies from "js-cookie";
import { Server } from "../main/Server";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useDevice } from "./DeviceContext";
import { useSearchParams } from "next/navigation";
import useFcmToken from "../hooks/useFcmToken";
interface AuthContextType {
  generalSettings: any;
  userSettings: any;
  user2Settings: any;
  handleLogout: () => void;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setDates: React.Dispatch<React.SetStateAction<any>>;

  loading: boolean;
  cartCount: any;
  setCartCount: React.Dispatch<React.SetStateAction<any>>;
}
interface UpdateFnParams {
  checker: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  key: string;
  dateKey: string;
  setDates: React.Dispatch<React.SetStateAction<any>>;
  queryClient: QueryClient;
  status: boolean;
  setCartCount?: React.Dispatch<React.SetStateAction<any>>;
  dates: {
    last_update_date_general: string;
    last_update_date_user: string;
    last_update_date_user2: string;
  };
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
  if (status && checker) {
    queryClient.setQueryData([key], checker);
    setDates((prevDates: any) => ({ ...prevDates, [dateKey]: checker.last_update_date }));
    setState(checker);
  } else if (!checker && queryClient.getQueryData([key])) {
    setState(queryClient.getQueryData([key]));
  } else {
    console.warn(`No data available for ${key}`);
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { device_info } = useDevice();
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
  const [generalSettings, setGeneralSettings] = useState<any>();
  const [userSettings, setUserSettings] = useState<any>();
  const [user2Settings, setUser2Settings] = useState<any>();
  const { unsubscribeFromNotifications } = useFcmToken();
  const [cartCount, setCartCount] = useLocalStorageState(0, "cartCount");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const referal = searchParams.get("referal");
  useEffect(() => {
    if (userSettings?.active === false) handleLogout();
    if (referal) localStorage.setItem("referal", referal);
  }, [userSettings]);
  useEffect(() => {
    if (userSettings && !token) handleLogout();
  }, [userSettings]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userSettings, user2Settings, generalSettings, "before server");
        console.log(dates, "dates before server");
        const res = await Server({
          resourceName: "MGS",
          body: {
            needed: ["general_settings", "user_settings", "user2_settings", "check_auth"],
            token,
            last_update_date_general: dates.last_update_date_general,
            last_update_date_user: dates.last_update_date_user,
            last_update_date_user2: dates.last_update_date_user2,
            device_id: device_info.device_unique_id,
          },
        });
        console.log(res);
        if (!res.check_auth && userSettings) handleLogout();

        updateFn({
          checker: res.general_settings.data,
          setState: setGeneralSettings,
          key: "general_settings",
          dateKey: "last_update_date_general",
          setDates,
          queryClient,
          status: res.general_settings.status,
          dates,
        });
        updateFn({
          checker: res.user_settings?.data,
          setState: setUserSettings,
          key: "user_settings",
          dateKey: "last_update_date_user",
          setDates,
          queryClient,
          status: res.user_settings?.status,
          dates,
        });
        updateFn({
          checker: res.user2_settings?.data,
          setState: setUser2Settings,
          key: "user2_settings",
          dateKey: "last_update_date_user2",
          setDates,
          queryClient,
          status: res.user2_settings?.status,
          dates,
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (queryClient !== undefined) fetchData();
  }, [login, queryClient]);
  console.log(userSettings, user2Settings, generalSettings, "after server", queryClient);
  useEffect(() => {
    setGeneralSettings(queryClient.getQueryData(["general_settings"]));
    setUserSettings(queryClient.getQueryData(["user_settings"]));
    setUser2Settings(queryClient.getQueryData(["user2_settings"]));
  }, [queryClient]);
  const handleLogout = () => {
    unsubscribeFromNotifications();
    setCartCount(0);
    setLoading(true);
    cookies.remove("jwt");
    cookies.remove("notificationToken");
    queryClient.removeQueries({ queryKey: ["user_settings"] });
    queryClient.removeQueries({ queryKey: ["user2_settings"] });
    queryClient.removeQueries({ queryKey: ["my-profile"] });
    const newDates = {
      last_update_date_general: "",
      last_update_date_user: "",
      last_update_date_user2: "",
    };
    setDates(newDates);
    setUserSettings(undefined);
    setUser2Settings(undefined);
    setLoading(false);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        generalSettings,
        userSettings,
        user2Settings,
        handleLogout,
        setLogin,
        loading,
        cartCount,
        setCartCount,
        setDates,
      }}
    >
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
