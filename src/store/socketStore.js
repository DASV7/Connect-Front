import { defineStore } from 'pinia'
import io from 'socket.io-client';
import { useCounterStore } from './users';
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
        userConnected() {
            const userStore = useCounterStore();
            const userLocal = userStore.$state.user
            if (userLocal?._id) {
                this.socket.emit('connected', userLocal)
            }
        },
        disconnect() {
            this.socket.close();
        }
    },
});