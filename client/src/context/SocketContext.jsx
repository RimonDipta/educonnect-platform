/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only connect if user is authenticated
    if (!isAuthenticated || !user) return;

    const newSocket = io('http://localhost:5000', {
      // auth: { token: user.token }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
