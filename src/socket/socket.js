import { reactive } from "vue";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_SOCKET || "http://localhost:5500";

export const socket = io(URL, {
    auth: {
        "user": localStorage.getItem("vinc-jwt") ? jwtDecode(localStorage.getItem("vinc-jwt")) : null
    }

});

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

