import { defineStore } from 'pinia'
import io from 'socket.io-client';

// Crea la instancia del store de Pinia

// Configura y establece la instancia del socket en el store
export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null,
    }),
    actions: {
        connect() {
            this.socket = io(import.meta.env.VITE_SOCKET);
        },
        disconnect() {
            this.socket.close();
        }
    },
});