"use client";
import getUnreadMsgCount from "@/app/actions/getUnreadMsgCount";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

const { createContext } = require("react");

//create context
const unreadMessageContext = createContext();

//create provider
export const UnreadMessageProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(1);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMsgCount().then((res) => {
        if (res.count) setUnreadMessages(res.count);
      });
    }
  }, [getUnreadMsgCount, session]);

  return (
    <unreadMessageContext.Provider
      value={{ unreadMessages, setUnreadMessages }}
    >
      {children}
    </unreadMessageContext.Provider>
  );
};

export function useUnreadMessageContext() {
  return useContext(unreadMessageContext);
}
