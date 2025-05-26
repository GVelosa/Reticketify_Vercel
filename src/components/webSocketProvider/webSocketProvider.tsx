'use client';

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

export function WebSocketProvider() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao WebSocket:', socket.id);
    });

    socket.on('newEvent', (data) => {
      console.log('Novo evento recebido via socket:', data);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
