import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "./config/baseUrl";
import io from "socket.io-client";

const UserSocketContext = createContext();

const UserSocketProvider = ({ children }) => {
  const [userSocket, setUserSocket] = useState(undefined);
  const isAuth = useSelector((state) => state.logIn.isAuth);
  const id = useSelector((state) => state.me.me.id);

  useEffect(() => {
    if (isAuth) {
      const socket = io(`${baseUrl}/user/${id}`, {
        forceNew: true,
        withCredentials: true,
      });

      socket.on("connect", () => setUserSocket(socket));
      socket.on("reconnect", () => setUserSocket(socket));
      socket.on("connect_error", () => setUserSocket(undefined));

      return () => socket.close();
    }
  }, [isAuth, id]);

  return (
    <UserSocketContext.Provider value={userSocket}>
      {children}
    </UserSocketContext.Provider>
  );
};

export { UserSocketContext, UserSocketProvider };