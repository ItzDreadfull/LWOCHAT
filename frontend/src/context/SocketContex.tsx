/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext, User } from "./AuthContext";
import io, { Socket } from "socket.io-client";

// const URL = process.env.Bak_URL || "http://localhost:8080";

// Define the type for the context value (update this as per your actual use case)
interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: User[];
}

// Create the context with an initial value
export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined
);

interface SocketContextProviderProps {
  children: ReactNode; // ReactNode includes JSX elements, strings, etc.
}

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return ctx;
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser && !socket) {
      const socketInstance = io("https://winchat-ttpp.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socketInstance);

      if (socketInstance) {
        socketInstance.on("newMessage", (newMessage) => {
          // Update the conversation state here
          console.log("New message received:", newMessage);
          // Trigger state update for the active chat (you'll need additional logic to target the correct conversation)
        });

        // Example: Listening for online users from the server
        socketInstance.on("getOnlineUsers", (users: User[]) => {
          setOnlineUsers(users);
        });
      }
      return () => {
        socketInstance.close();
        setSocket(null);
        setOnlineUsers([]);
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setOnlineUsers([]);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
